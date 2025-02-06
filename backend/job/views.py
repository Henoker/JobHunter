from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.auth import TokenAuthentication
from .models import Job
from .serializers import JobSerializer

class ListCreateJobView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        """Return only jobs created by the logged-in user"""
        return Job.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        """Assign the job to the authenticated user"""
        serializer.save(created_by=self.request.user)


class RetrieveUpdateDeleteJobView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        """Ensure users can only update/delete their own jobs"""
        return Job.objects.filter(created_by=self.request.user)

