from django.shortcuts import render
from rest_framework import generics
from .models import Job
from .serializers import JobSerializer

# Create your views here.
class ListJob(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class DetailJob(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer