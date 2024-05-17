from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Dates(models.Model):
    name = models.CharField(max_length=100)
    dateNum = models.IntegerField()
    tip = models.TextField()
    dateIdeas = models.TextField()

