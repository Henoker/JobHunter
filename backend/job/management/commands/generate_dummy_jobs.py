import random
from datetime import timedelta
from django.utils.timezone import now
from django.core.management.base import BaseCommand
from job.models import Job
from accounts.models import CustomUser  # Adjust based on your user model

class Command(BaseCommand):
    help = "Generate dummy job data for existing users"

    def handle(self, *args, **kwargs):
        job_positions = ["Software Engineer", "Data Scientist", "Project Manager", "UX Designer", "Product Manager"]
        companies = ["Google", "Amazon", "Microsoft", "Facebook", "Netflix", "Tesla", "Apple"]
        job_types = ["full-time", "part-time", "remote", "internship"]
        job_statuses = ["pending", "interview", "declined"]
        locations = ["New York", "San Francisco", "Los Angeles", "Seattle", "Chicago", "Austin", "Boston"]

        users = CustomUser.objects.all()

        if not users:
            self.stdout.write(self.style.ERROR("No users found in the database. Create users first."))
            return

        jobs_to_create = []

        for user in users:
            for _ in range(random.randint(5, 15)):  # Each user gets 5-15 jobs
                created_at = now() - timedelta(days=random.randint(0, 365))  # Random date within the past year
                job = Job(
                    company=random.choice(companies),
                    position=random.choice(job_positions),
                    status=random.choice(job_statuses),
                    job_type=random.choice(job_types),
                    job_location=random.choice(locations),
                    created_by=user,
                    created_at=created_at,
                    updated_at=created_at,
                )
                jobs_to_create.append(job)

        Job.objects.bulk_create(jobs_to_create)  # Bulk create for efficiency
        self.stdout.write(self.style.SUCCESS(f"Successfully created {len(jobs_to_create)} dummy jobs."))
