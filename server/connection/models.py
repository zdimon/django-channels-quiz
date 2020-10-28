from django.db import models


class SocketConnection(models.Model):
    sid = models.CharField(max_length=250, db_index=True, null=True, unique=True)

    @staticmethod
    def create_if_not_exist(data):
        try:
            SocketConnection.objects.get(sid=data['sid'])
        except:
            SocketConnection.objects.create( \
                sid = data['sid'], 
            )