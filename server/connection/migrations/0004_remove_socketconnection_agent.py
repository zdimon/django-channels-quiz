# Generated by Django 3.0.7 on 2020-10-28 13:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('connection', '0003_remove_socketconnection_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='socketconnection',
            name='agent',
        ),
    ]
