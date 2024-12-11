from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = (
            "company",
            "position",
            "status",
            "job_location",
            "job_type",
        )