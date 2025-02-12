from django.urls import path
from .views import ListCreateJobView, RetrieveUpdateDeleteJobView, JobStatisticsView

urlpatterns = [
    path("jobs/", ListCreateJobView.as_view(), name="list-create-job"),
    path("jobs/<int:pk>/", RetrieveUpdateDeleteJobView.as_view(), name="retrieve-update-delete-job"),
    path('jobs/stats/', JobStatisticsView.as_view(), name='job-statistics')
]
