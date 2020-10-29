from rest_framework import generics
from quiz.api.serializers.sticker import StickerSerializer
from quiz.models import Sticker

from rest_framework import viewsets

class StickerListView(generics.ListAPIView):
    '''
    
    Sticker list.

    ____________

    '''
    serializer_class = StickerSerializer
    queryset = Sticker.objects.all().order_by('-id')