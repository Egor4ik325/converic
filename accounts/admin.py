from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import register

from .forms import AccountCreationForm, AccountChangeForm
from .models import Account


@register(Account)
class AccountAdmin(UserAdmin):
    """Admin model for administration Account model. Configure admin inteface."""
    add_form = AccountCreationForm
    form = AccountChangeForm
    model = Account
    list_display = ('email', 'username', 'is_staff', 'is_active')
    list_filter = ('email', 'username', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)
