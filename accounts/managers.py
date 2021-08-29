from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
    """Custom account manager for managing accounts.
    Provide convinient methods to create users and superusers."""

    def create_user(self, email, password=None, **extra_fields):
        """Use it to create and save new user."""
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # AbstractBaseUser.set_password
        user.save()

    def create_superuser(self, email, password=None, **extra_fields):
        """Use it to create and save new superuser."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
