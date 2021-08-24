from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import ConvertView, get_csrf

urlpatterns = [
    # Unauth urls
    path('convert/', csrf_exempt(ConvertView.as_view())),

    # Authenticated urls
    path('get_cstf/', get_csrf, name="get_cstf"),
]
