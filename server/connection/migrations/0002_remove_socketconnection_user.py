# Generated by Django 3.0.7 on 2020-10-28 13:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('connection', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='socketconnection',
            name='user',
        ),
    ]
