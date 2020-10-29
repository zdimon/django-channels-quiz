from rest_framework import generics
from quiz.api.serializers.player import PlayerSerializer, JoinPlayerRequestSerializer, JoinPlayerResponseSerializer
from quiz.models import Player, Sticker, Question
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from quiz.api.serializers.question import QuestionSerializer

class PlayerListView(generics.ListAPIView):
    '''
    
    Player list.

    ____________

    '''
    serializer_class = PlayerSerializer
    queryset = Player.objects.all().order_by('-id')

class JoinUserView(APIView):
    '''
    
    Join user

    __________


    '''
    permission_classes = (AllowAny,)
    @swagger_auto_schema( 
        request_body = JoinPlayerRequestSerializer,
        responses={200: JoinPlayerResponseSerializer} 
        )
    def post(self, request):
        try:
            Player.objects.get(name=request.data['name'])
            return Response({'status': 1, 'message': 'This user already exists!'})
        except:
            sticker = Sticker.objects.get(pk=request.data['sticker_id'])
            player = Player()
            player.name = request.data['name']
            player.sticker = sticker
            player.save()
            
            return Response(QuestionSerializer(Question.get_current_question()).data)

        