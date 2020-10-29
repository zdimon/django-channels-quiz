from rest_framework import serializers
from quiz.models import Player
from .sticker import StickerSerializer
from .question import QuestionSerializer
from rest_framework.validators import UniqueValidator
from quiz.models import Player

class PlayerSerializer(serializers.ModelSerializer):
    sticker = StickerSerializer()
    class Meta:
        model = Player 
        fields = (
            'id',
            'name',
            'sticker',
            'account'
        )


class JoinPlayerRequestSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    sticker_id = serializers.IntegerField(required=True)

    
class JoinPlayerResponseSerializer(serializers.Serializer):
    question = QuestionSerializer()
    