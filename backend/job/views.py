from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from .models import Job
from .serializers import JobSerializer

class ListCreateJobView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        """Return only jobs created by the logged-in user"""
        # Ensure the queryset is filtering properly by the logged-in user
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


class JobStatisticsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        """Return statistics about job statuses"""
        user = request.user
        total_jobs = Job.objects.filter(created_by=user).count()
        pending_jobs = Job.objects.filter(created_by=user, status="pending").count()
        interview_jobs = Job.objects.filter(created_by=user, status="interview").count()
        declined_jobs = Job.objects.filter(created_by=user, status="declined").count()

        return Response({
            "total_jobs": total_jobs,
            "pending_jobs": pending_jobs,
            "interview_jobs": interview_jobs,
            "declined_jobs": declined_jobs
        })

