from django.apps import AppConfig

class ConnectionConfig(AppConfig):
    name = 'connection'
    def ready(self):
        from connection.models import SocketConnection
        SocketConnection.objects.all().delete()


