from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin

from quiz.api.serializers.message import QuizRoomMessageSerializer, MessageRequestSerializer
from server.serializers.noauth import NoAuthSerializer
from quiz.models import  RoomMessage

class MessageListView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema( 
        responses={200: QuizRoomMessageSerializer, 401: NoAuthSerializer} )

    def get(self, request):
        #room = Room.objects.get(token=token)
        messages = RoomMessage.objects.all()
        return Response(QuizRoomMessageSerializer(messages, many=True).data)


class GetRoomMessageView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema( 
        responses={200: QuizRoomMessageSerializer, 401: NoAuthSerializer} )

    def get(self, request, token):
        room = Room.objects.get(token=token)
        messages = RoomMessage.objects.filter(room=room)
        return Response(QuizRoomMessageSerializer(messages, many=True).data)

class CreateQuizMessageView(APIView):
    '''
    
    Create a new message in the quiz room.
    '''

    permission_classes = [AllowAny]

    @swagger_auto_schema( 
        request_body=MessageRequestSerializer,
        responses={200: QuizRoomMessageSerializer, 401: NoAuthSerializer} )
    def post(self, request): 
        obj = RoomMessage()
        obj.playername = request.data['playername']
        obj.text = request.data['message']
        obj.check_answer()
        obj.save()
        return Response(QuizRoomMessageSerializer(obj).data)