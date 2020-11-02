from rest_framework import serializers
from quiz.models import RoomMessage


class MessageRequestSerializer(serializers.Serializer):
    message = serializers.CharField()
    playername = serializers.CharField()


class QuizRoomMessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RoomMessage
        fields = [
            'id',
            'is_right',
            'is_service',
            'playername',
            'playerimage',
            'count_wrong',
            'text',
            'created_at']
