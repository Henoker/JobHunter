from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True) 
    
    class Meta:
        model = Job
        fields = ['id', 'company', 'position', 'status', 'job_location', 'job_type', 'created_at', 'created_by']