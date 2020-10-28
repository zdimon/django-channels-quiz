from django.shortcuts import render

def index(request):
    return render(request,'index.html')


from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from connection.models import SocketConnection

def send(request):
    channel_layer = get_channel_layer()
    for c in SocketConnection.objects.all():
        print('Sending to %s' % c.sid)
        async_to_sync(channel_layer.send)(c.sid, {'type': 'test_hendler'})

    return render(request,'send.html')
