from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Date

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # consider is_superuser as is_male since
        # there's no gender field in user class within django auth models
        fields = ["id", "first_name", "last_name", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = [
            "id",
            "fname",
            "age",
            "gender",
            "dateNum",
            "created_at",
            "tip",
            "dateIdeas",
        ]
