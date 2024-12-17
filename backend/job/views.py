from django.shortcuts import render
from rest_framework import generics
from .models import Job
from .serializers import JobSerializer

# Create your views here.
class ListJob(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    def perform_create(self, serializer):
        # Automatically set created_by to the logged-in user
        serializer.save(created_by=self.request.user)


class DetailJob(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer