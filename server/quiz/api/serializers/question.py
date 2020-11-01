from rest_framework import serializers
from quiz.models import Question
from quiz.api.serializers.theme import ThemeSerializer

class QuestionSerializer(serializers.ModelSerializer):
    theme = ThemeSerializer()

    class Meta:
        model = Question 
        fields = (
            'lang', 
            'level', 
            'tp', 
            'mode', 
            'theme', 
            'question',  
            'answers', 
            'is_published',  
            'order'
        )