from rest_framework import serializers
from quiz.models import Sticker

class StickerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sticker 
        fields = (
            'id',
            'get_url',
        )
