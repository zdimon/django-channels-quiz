from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync
from connection.models import SocketConnection

class CardConsumer(WebsocketConsumer):

    sid = None;
    def connect(self):
        print('Connnect!!! %s' % self.channel_name)
        self.accept()
        self.sid = self.channel_name
        SocketConnection.create_if_not_exist({'sid': self.channel_name})
        # self.send(text_data=json.dumps({ \
        #     'type': 'online:ping', \
        #     'payload': 'ping from server' \
        #     } \
        # ))

    def disconnect(self, close_code):
        print('DISCONNECT!!!')
        try:
            SocketConnection.objects.get(sid = self.sid).delete()
        except:
            pass


    def receive(self, text_data):
        message = json.loads(text_data)
        print(message)


    def test_hendler(self,event):
        message = {  \
            'type': 'test_hendler', \
            'message': 'test' \
        }
        self.send(text_data=json.dumps(message))
