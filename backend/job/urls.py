from django.urls import path
from .views import ListCreateJobView, RetrieveUpdateDeleteJobView

urlpatterns = [
    path("/jobs/", ListCreateJobView.as_view(), name="list-create-job"),
    path("/jobs/<int:pk>/", RetrieveUpdateDeleteJobView.as_view(), name="retrieve-update-delete-job"),
]
