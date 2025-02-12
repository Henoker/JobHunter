from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from .models import Job
from .serializers import JobSerializer
from django.utils.timezone import now
from django.db.models.functions import TruncMonth
from django.db.models import Count

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

        # Aggregate job applications by month
        monthly_jobs = (
            Job.objects.filter(created_by=user)
            .annotate(month=TruncMonth("created_at"))
            .values("month")
            .annotate(count=Count("id"))
            .order_by("month")
        )

        # Format data for frontend
        monthly_job_applications = [
            {"date": entry["month"].strftime("%Y-%m"), "count": entry["count"]}
            for entry in monthly_jobs
        ]

        return Response({
            "total_jobs": total_jobs,
            "pending_jobs": pending_jobs,
            "interview_jobs": interview_jobs,
            "declined_jobs": declined_jobs,
            "monthly_job_applications": monthly_job_applications,  # Now an array
        })