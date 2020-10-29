
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response

from quiz.api.serializers.question import QuestionSerializer
from server.serializers.noauth import NoAuthSerializer
from quiz.models import Question




class GetCurrentQuestion(APIView):
    '''
    
    Get current question.

    ______________________________
    '''
    permission_classes = (AllowAny,)
    @swagger_auto_schema( 
        responses={200: QuestionSerializer} )

    def get(self, request):
        q = Question.get_current_question()
        return Response(QuestionSerializer(q).data)