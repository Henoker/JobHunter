from django.urls import path
from .views import ListJob, DetailJob

urlpatterns = [
    path("<int:pk>/", DetailJob.as_view(), name="job_detail"),
    path("", ListJob.as_view(), name="job_list"),
]