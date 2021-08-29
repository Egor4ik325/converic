from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Account


class AccountCreationForm(UserCreationForm):
    """Form for creating new user in the admin inteface."""

    class Meta:
        model = Account
        fields = ('email',)


class AccountChangeForm(UserChangeForm):
    """Form for change user in the admin inteface."""

    class Meta:
        model = Account
        fields = ('email',)
