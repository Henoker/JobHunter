from django.contrib import admin
from .models import Job
# Register your models here.
class JobAdmin(admin.ModelAdmin):
    list_display = ("company", "position", "status", "job_type", "job_location", "created_at" )

admin.site.register(Job, JobAdmin)

