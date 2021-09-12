from django.urls import path

from .views import account_session, get_csrf, register, account_login, account_logout

urlpatterns = [
    path('get_session/', account_session),
    path('get_csrf/', get_csrf),
    path('register/', register, name='account_register'),
    path('login/', account_login, name="account_login"),
    path('logout/', account_logout),
]
