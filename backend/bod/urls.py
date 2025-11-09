from django.urls import path
from . import views

urlpatterns = [
    path('add-shareholders/',views.AddShareholders.as_view()),
    path('add-candidates/',views.AddCandidates.as_view()),
    path('get-candidates/',views.GetCandidates.as_view()),
    path('create-election/',views.CreateElection.as_view()),
    path('start-election/',views.StartElection.as_view()),
    path('end-election/',views.EndElection.as_view()),
    path('cast-vote/',views.CastVote.as_view())
]