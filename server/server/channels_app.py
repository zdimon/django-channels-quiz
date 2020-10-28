from channels.routing import ProtocolTypeRouter, URLRouter
from card.card_consumer import CardConsumer
from django.urls import re_path
from channels.auth import AuthMiddlewareStack


websocket_urlpatterns = [
    re_path(r'card/$', CardConsumer),
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ), 
})