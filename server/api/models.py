from django.db import models
from django.contrib.auth.models import User, AbstractUser


# Create your models here.

class Date(models.Model):
    fname = models.CharField()
    age = models.IntegerField()
    gender = models.CharField()
    dateCount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    tip = models.TextField()
    dateIdeas = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dates")

    def __str__(self):
        return self.name
