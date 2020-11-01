from django.db import models
from django.utils.translation import ugettext_lazy as _
import pytils
import hashlib
import time
import uuid 
from server.celery import app
import logging
import random
from django.conf import settings
from django.utils.html import mark_safe
import random
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import time

class Theme(models.Model):
    """
    Темы вопросов.
    """
    slug = models.SlugField(help_text=_(u"Alias"))
    name = models.CharField(help_text=_(u"Name"), max_length=100)
    def __unicode__(self):
        return self.name
    def save(self, **kwargs):
        if not self.id:
            self.slug = pytils.translit.slugify(self.name)
        return super(Theme, self).save(**kwargs)

class Question(models.Model):
    '''
        Questions
    '''
    level = (
        ('1', _('Elementary')),
        ('2', _('Easy')),
        ('3', _('Middle')),
        ('4', _('Hard')),
        ('5', _('Very hard'))
    )
    lang = (
        ('ru', _('Russian')),
        ('en', _('English')),
        ('ru-en', _('Russian and English')),
      
    )
    tp =  (
        ('fullmatch', _('Full match')),
        ('substring', _('Substring match'))
    )


    lang = models.CharField(help_text=_(u"Language"), max_length=5, default="ru")
    level = models.IntegerField(help_text=_(u"Level"), default="3")
    tp = models.CharField(help_text=_(u"Mode of quize"), max_length=12, default="questionend")
    mode = models.CharField(help_text=_(u"Type of matching"), max_length=10, default="fullmatch")
    theme = models.ForeignKey(Theme, null=True, blank=True, on_delete=models.SET_NULL)
    question = models.TextField(verbose_name=_(u"Question"))
    answers = models.TextField(verbose_name=_(u"Answers"), default='', help_text=_('Divided by coma')) 
    is_published = models.BooleanField(default=True)
    order = models.IntegerField(help_text=_(u"Order"), default="1")
    is_current = models.BooleanField(default=False)

    @property
    def is_edit(self):
        return False

    def get_answers(self):
        return self.answers

    def send_new_question_message(self):
        channel_layer = get_channel_layer()
        from quiz.api.serializers.question import QuestionSerializer
        from connection.models import SocketConnection
        for con in SocketConnection.objects.all():
            payload =  { \
                        'type': 'quiz_new_question', \
                        'message': QuestionSerializer(self).data \
                       }        
            async_to_sync(channel_layer.send)(con.sid, payload)

    @staticmethod
    def make_rundom():
        Question.objects.all().update(is_current=False)
        cnt = Question.objects.all().count()
        rnd = random.randint(1,cnt)
        q = Question.objects.all()[rnd]
        q.is_current = True
        q.save()
        q.send_new_question_message()
        return q

    @staticmethod
    def get_current_question():
        try:
            return Question.objects.get(is_current=True)
        except:
            return Question.make_rundom()      

    def __str__(self):
        return self.question

class RoomMessage(models.Model):
    '''
        Сообщения комнаты
    '''
    is_right = models.BooleanField(default=False)
    is_service = models.BooleanField(default=False)
    text = models.TextField(verbose_name=_(u'Text'))
    created_at = models.DateTimeField(auto_now_add=True)
    playername = models.CharField(help_text=_(u"Name"), max_length=100)
    playerimage = models.CharField(help_text=_(u"Name"), max_length=200)

    @property
    def count_wrong(self):
        return RoomMessage.objects.filter(is_right=False).count()

    @staticmethod
    def check_wrong_answers():

        if RoomMessage.objects.filter(is_right=False).count()>4:
            channel_layer = get_channel_layer()
            from connection.models import SocketConnection
            RoomMessage.objects.all().delete()
            Question.make_rundom()
            for connection in SocketConnection.objects.all():
                payload =  { \
                        'type': 'new_question', \
                       }        
                async_to_sync(channel_layer.send)(connection.sid, payload)

    def check_answer(self):
        answer = Question.get_current_question()
        if self.text.upper() == answer.get_answers():
            self.is_right = True
            self.save()
            Question.make_rundom()
            # add user account
            user = Player.objects.get(name=self.playername)
            user.add_account()

    def save(self, *args, **kwargs):
        
        if not self.pk:
           super(RoomMessage, self).save(*args, **kwargs)
           self.send_quiz_message(self.pk)
           # clearing messages
           if len(self.text.split(' ')>1): 
               self.delete()
           RoomMessage.clear_messages()
           RoomMessage.check_wrong_answers()
        super(RoomMessage, self).save(*args, **kwargs)

    @staticmethod
    def clear_messages():
        cnt = RoomMessage.objects.all().count()
        if cnt > 5:
            for m in RoomMessage.objects.all().order_by('-id')[5:]:
                channel_layer = get_channel_layer()
                from quiz.api.serializers.message import QuizRoomMessageSerializer
                from connection.models import SocketConnection
                for con in SocketConnection.objects.all():
                    payload =  { \
                                'type': 'quiz_delete_message', \
                                'message': QuizRoomMessageSerializer(m).data \
                            }        
                    async_to_sync(channel_layer.send)(con.sid, payload)
                m.delete()
        

    @app.task
    def send_quiz_message(id):
        obj = RoomMessage.objects.get(pk=id)
        channel_layer = get_channel_layer()
        from quiz.api.serializers.message import QuizRoomMessageSerializer
        from connection.models import SocketConnection
        for connection in SocketConnection.objects.all():
            payload =  { \
                        'type': 'quiz_message', \
                        'message': QuizRoomMessageSerializer(obj).data \
                       }        
            async_to_sync(channel_layer.send)(connection.sid, payload)
    

class Smile(models.Model):
    image = models.ImageField(upload_to='smile')

    @property
    def get_url(self):
        return settings.DOMAIN_URL+self.image.url

    @property
    def get_image_tag(self):
        return mark_safe('<img src="%s" />' % self.get_url)

class Sticker(models.Model):
    image = models.ImageField(upload_to='sticker')

    @property
    def get_url(self):
        return settings.DOMAIN_URL+self.image.url

    @property
    def get_image_tag(self):
        return mark_safe('<img src="%s" />' % self.get_url)

    def __str__(self):
        return self.get_image_tag


class Player(models.Model):
    name = models.CharField(help_text=_(u"Name"), max_length=100, unique=True)
    sticker = models.ForeignKey(Sticker, verbose_name=_(u'sticker'), on_delete=models.SET_NULL, null=True, blank=True)
    account = models.IntegerField(default=0)
    activity = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        
        if not self.pk:
            channel_layer = get_channel_layer()
            from connection.models import SocketConnection
            for con in SocketConnection.objects.all():
                payload =  { \
                            'type': 'new_user', \
                        }        
                async_to_sync(channel_layer.send)(con.sid, payload)
        super(Player, self).save(*args, **kwargs)

    def add_account(self):
        self.account += 1
        self.save()
        channel_layer = get_channel_layer()
        from quiz.api.serializers.player import PlayerSerializer
        from connection.models import SocketConnection
        for con in SocketConnection.objects.all():
            payload =  { \
                        'type': 'quiz_update_account', \
                        'message': PlayerSerializer(self).data \
                       }        
            async_to_sync(channel_layer.send)(con.sid, payload)

    @staticmethod
    def clear_lazy():
        tm = time.time()-(60*5)
        Player.objects.filter(activity__lt = tm).delete()