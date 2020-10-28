from django.apps import AppConfig

class ConnectionConfig(AppConfig):
    name = 'connection'
    def ready(self):
        try:
            from connection.models import SocketConnection
            SocketConnection.objects.all().delete()
        except:
            pass


