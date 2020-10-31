from django.contrib import admin
from quiz.models import Theme, Question, RoomMessage, Smile, Sticker, Player

class ThemeAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
admin.site.register(Theme, ThemeAdmin)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'theme', 'get_answers', 'lang', 'level', 'is_published')
    list_filter = ('is_published', 'theme')
    list_editable = ('is_published',)

admin.site.register(Question, QuestionAdmin)


class RoomMessageAdmin(admin.ModelAdmin):
    list_display = (
        'is_right',
        'is_service',
        'text',
        'created_at',
        'playername'
    )

admin.site.register(RoomMessage, RoomMessageAdmin)



# class SmileAdmin(admin.ModelAdmin):
#     list_display = (
#         'image',
#     )

# admin.site.register(Smile, SmileAdmin)


class StickerAdmin(admin.ModelAdmin):
    list_display = (
        'get_image_tag',
    )
    def image_tag(self):
        from django.utils.html import escape
        return u'<img src="%s" />' % escape(self.image.url)

admin.site.register(Sticker, StickerAdmin)

class PlayerAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'sticker',
        'account'
    )
    

admin.site.register(Player, PlayerAdmin)
