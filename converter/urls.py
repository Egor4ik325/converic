from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import ConvertView, get_supported_formats

urlpatterns = [
    # Unauth urls
    path('convert/', csrf_exempt(ConvertView.as_view())),
    path('convert/formats/', get_supported_formats),
]
