from django.test import TestCase
from django.contrib.auth import get_user_model


class UserManagerTests(TestCase):
    """Test custom user model (account)."""

    def test_create_user(self):
        """Test custom model manager create_user method."""
        # Use user manager to create new user
        User = get_user_model()
        user = User.users.create_user(
            email='normal@user.com', password='okpassword')

        # Assert all attributes are set correctly
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

        # Assert username fields doesn't exists
        self.assertTrue(not user.username)

        # Assert create_user method doesn't work with empty arguments
        with self.assertRaises(TypeError):
            User.users.create_user()
        with self.assertRaises(ValueError):
            User.users.create_user(email='')
        with self.assertRaises(ValueError):
            User.users.create_user(email='', password='somepassword')

    def test_create_superuser(self):
        """Test custom model manager create_superuser method."""
        # Use user manager to create new superuser
        User = get_user_model()
        admin = User.users.create_superuser(
            email='super@user.com', password='okpassword')

        # Assert attributes are set correctly
        self.assertEqual(admin.email, 'super@user.com')
        self.assertTrue(admin.is_active)
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)
        self.assertTrue(not admin.username)

        # Assert create_superuser doesn't work with invalid arguments
        with self.assertRaises(TypeError):
            User.users.create_superuser()
        with self.assertRaises(ValueError):
            User.users.create_superuser(email='')
        with self.assertRaises(ValueError):
            User.users.create_superuser(email='', password='somepassword')
