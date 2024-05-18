from django.urls import path
from . import views

urlpatterns = [
    path("dates/", views.CreateDateView.as_view(), name="date-list"),
    path("dates/delete/<int:pk>/", views.DeleteDateView.as_view(), name="delete-date")
]
