from django.urls import path
from . import views

urlpatterns = [
    path('auth/request-challenge/',views.RequestChallenge.as_view()),
    path('auth/verify/',views.VerifyChallenge.as_view())
]
