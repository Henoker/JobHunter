from django.shortcuts import render
from rest_framework import generics
from .models import Job
from .serializers import JobSerializer
from .permissions import IsUserOrReadOnly
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class ListJob(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    def perform_create(self, serializer):
        # Automatically set created_by to the logged-in user
        serializer.save(created_by=self.request.user)


class DetailJob(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Job.objects.all()
    serializer_class = JobSerializer