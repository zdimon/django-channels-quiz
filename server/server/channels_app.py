from channels.routing import ProtocolTypeRouter, URLRouter
from quiz.quiz_consumer import QuizConsumer
from django.urls import re_path
from channels.auth import AuthMiddlewareStack


websocket_urlpatterns = [
    re_path(r'quiz/$', QuizConsumer),
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ), 
})