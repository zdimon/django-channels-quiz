# Generated by Django 3.0.7 on 2020-10-29 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0006_remove_roommessage_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='roommessage',
            name='playername',
            field=models.CharField(default='', help_text='Name', max_length=100),
            preserve_default=False,
        ),
    ]