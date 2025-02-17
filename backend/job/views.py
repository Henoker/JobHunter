from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from .models import Job
from .serializers import JobSerializer
from django.utils.timezone import now
from django.db.models.functions import TruncMonth
from django.db.models import Count
from django.db.models import Q 

class ListCreateJobView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    filter_backends = [filters.SearchFilter]

    def get_queryset(self):
        """Return only jobs created by the logged-in user, with optional filtering"""
        user = self.request.user
        queryset = Job.objects.filter(created_by=user)

        # Get query parameters safely
        search_query = self.request.query_params.get("search", "").strip()
        status_filter = self.request.query_params.get("status", "").strip()
        job_type_filter = self.request.query_params.get("job_type", "").strip()
        sort_option = self.request.query_params.get("sort", "latest").strip()

        # Apply search filter (if provided)
        if search_query:
            queryset = queryset.filter(
                Q(position__icontains=search_query) | Q(company__icontains=search_query)
            )

        # Filter by job status
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        # Filter by job type
        if job_type_filter:
            queryset = queryset.filter(job_type=job_type_filter)

        # Apply sorting safely
        valid_sort_options = {
            "latest": "-created_at",
            "oldest": "created_at",
            "a-z": "position",
            "z-a": "-position",
        }

        if sort_option in valid_sort_options:
            queryset = queryset.order_by(valid_sort_options[sort_option])
        else:
            return Response(
                {"error": "Invalid sorting option"}, status=status.HTTP_400_BAD_REQUEST
            )

        return queryset


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