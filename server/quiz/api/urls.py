from django.urls import path, include
from .views.theme import ThemeListView, ThemeListViewSet
from .views.message import GetRoomMessageView, CreateQuizMessageView, MessageListView
from .views.player import PlayerListView, JoinUserView
from .views.sticker import StickerListView
from .views.question import GetCurrentQuestion
urlpatterns = [ 
    path('get_current_question', GetCurrentQuestion.as_view()),
    path('message/list', MessageListView.as_view()),
    path('save_message',CreateQuizMessageView.as_view()),
    path('player/list',PlayerListView.as_view()),
    path('player/join',JoinUserView.as_view()),
    path('sticker/list',StickerListView.as_view()),
]