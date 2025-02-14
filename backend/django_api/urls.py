from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("job.urls")),
    path("api/v1/accounts", include("accounts.urls")),
    path('api/v1/password_reset/',include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
  
   
]
