"""
URL configuration for civic_connect project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('healthz/', lambda request: JsonResponse({'status': 'ok'}), name='healthz'),
    path('api/', include([
        path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
        path('', include('connectapp.urls')),
    ])),
    path('api-auth/', include('rest_framework.urls')),
]
