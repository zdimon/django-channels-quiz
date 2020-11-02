from rest_framework import generics
from quiz.api.serializers.player import PlayerSerializer, JoinPlayerRequestSerializer, JoinPlayerResponseSerializer
from quiz.models import Player, Sticker, Question
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from quiz.api.serializers.question import QuestionSerializer
import time

class PlayerListView(generics.ListAPIView):
    '''
    
    Player list.

    ____________

    '''
    serializer_class = PlayerSerializer
    queryset = Player.objects.all().order_by('-account')

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
        print(request.data)
        try:
            Player.objects.get(name=request.data['name'])
            return Response({'status': 1, 'error': 'This user already exists!'})
        except:
            try:
                sticker = Sticker.objects.get(pk=request.data['sticker_id'])
            except:
                return Response({'status': 1, 'error': 'Sticker not found!'})
            player = Player()
            player.name = request.data['name']
            player.sticker = sticker
            player.activity = time.time()
            player.save()
            Player.clear_lazy()
            
            return Response(PlayerSerializer(player).data)

        