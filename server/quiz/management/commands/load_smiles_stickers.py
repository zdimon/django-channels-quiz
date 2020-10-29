# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand, CommandError
from quiz.models import Room, RoomMessage, Smile, Sticker
from server.settings import FIXTURES_PATH
import os
import json
from django.core.files import File

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading smiles and stickers')
        Smile.objects.all().delete()
        Sticker.objects.all().delete()

        #Loading smiles to model 
        path = os.path.join(FIXTURES_PATH, "smiles")
        files = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]
        for f in files:
            smile = Smile()
            filepath = os.path.join(path, f)
            with open(filepath, 'rb') as doc_file:
                smile.image.save(f, File(doc_file), save=True)
            smile.save()
            
        #Loading stikcers to model 
        path = os.path.join(FIXTURES_PATH, "stickers")
        files = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]
        for f in files:
            sticker = Sticker()
            filepath = os.path.join(path, f)
            with open(filepath, 'rb') as doc_file:
                sticker.image.save(f, File(doc_file), save=True)
            sticker.save()