from django.contrib import admin
from connection.models import SocketConnection

@admin.register(SocketConnection)
class SocketConnectionAdmin(admin.ModelAdmin):
    list_display = [
        'sid'
        ]