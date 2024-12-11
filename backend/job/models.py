from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Job(models.Model):
    INTERVIEW = 'interview'
    DECLINED = 'declined'
    PENDING = 'pending'
    STATUS_CHOICES = [
        (INTERVIEW, 'Interview'),
        (DECLINED, 'Declined'),
        (PENDING, 'Pending'),
    ]

    FULL_TIME = 'full-time'
    PART_TIME = 'part-time'
    REMOTE = 'remote'
    INTERNSHIP = 'internship'
    JOB_TYPE_CHOICES = [
        (FULL_TIME, 'Full-time'),
        (PART_TIME, 'Part-time'),
        (REMOTE, 'Remote'),
        (INTERNSHIP, 'Internship'),
    ]
    company = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        help_text="Please provide company"
    )
    position = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        help_text="Please provide position"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=PENDING,
    )
    job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPE_CHOICES,
        default=FULL_TIME,
    )
    job_location = models.CharField(
        max_length=255,
        default='my city',
        null=False,
        blank=False,
        help_text="Job location"
    )
    created_by = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='jobs',
        help_text="Please provide user"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.position} at {self.company}"
