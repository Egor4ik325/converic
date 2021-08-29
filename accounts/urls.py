from django.urls import path

from .views import account_session, get_csrf, register

urlpatterns = [
    path('get_session/', account_session),
    path('get_csrf/', get_csrf),
    path('register/', register, name='account_register'),
]
