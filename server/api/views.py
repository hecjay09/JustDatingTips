from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, DateSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Date


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CreateDateView(generics.ListCreateAPIView):
    serializer_class = DateSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Date.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class DeleteDateView(generics.DestroyAPIView):
    serializer_class = DateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Date.objects.filter(author=user)
    
class UpdateDateView(generics.UpdateAPIView):
    serializer_class = DateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Date.objects.filter(author=user)
