from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Date(models.Model):
    fname = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField()
    dateNum = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    tip = models.TextField()
    dateIdeas = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dates")

    def __str__(self):
        return self.name
