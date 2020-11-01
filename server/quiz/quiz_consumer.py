from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync
from connection.models import SocketConnection

class QuizConsumer(WebsocketConsumer):

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

    def quiz_message(self,event):
        message = {  \
            'type': 'message', \
            'message': event['message'] \
        }
        self.send(text_data=json.dumps(message))

    def quiz_new_question(self,event):
        message = {  \
            'type': 'new_question', \
            'message': event['message'] \
        }
        self.send(text_data=json.dumps(message))

    def quiz_update_account(self,event):
        message = {  \
            'type': 'update_account', \
            'message': event['message'] \
        }
        self.send(text_data=json.dumps(message))

    def quiz_delete_message(self,event):
        message = {  \
            'type': 'delete_message', \
            'message': event['message'] \
        }
        self.send(text_data=json.dumps(message))

    def new_question(self,event):
        message = {  \
            'type': 'new_question', \
        }
        self.send(text_data=json.dumps(message))
