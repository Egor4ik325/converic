from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _

from .managers import AccountManager


class Account(AbstractBaseUser, PermissionsMixin):
    """User account model.
    Implement fully featured user model.

    Email and password are required. Other fields are optional."""

    email = models.EmailField(
        _('email address'),
        unique=True,
        error_messages={
            'unique': _("A user with that email already exists."),
        },
    )
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        null=True,
        blank=True,
        validators=[ASCIIUsernameValidator],
        error_messages={
            'unique': _("This username is already taken."),
        },
    )
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_active = models.BooleanField(_('active'), default=True)
    date_joined = models.DateTimeField(_('date joined'), default=now)

    users = AccountManager()

    USERNAME_FIELD = 'email'

    class Meta:
        verbose_name = _('account')
        verbose_name_plural = _('accounts')

    def __str__(self):
        """Return user name or email."""
        return self.username if self.username else self.email
