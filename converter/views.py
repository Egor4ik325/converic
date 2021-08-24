import json

from django.views import View
from django.http import HttpResponse


class ConvertView(View):
    """Convert passed image on POST.
    Respond with format options on GET."""

    def get(self, request, *args, **kwargs):
        return HttpResponse("Use POST method!", content_type='text/plain', status=200)

    def post(self, request, *args, **kwargs):
        # Get image from Django file uploads
        image = request.FILES.get('image')

        # TODO: validate image format

        # Convert image to the specified format
        # ...

        return HttpResponse("Image is recived.")


def get_csrf(request):
    """Respond with session token for CSRF Auth protection."""
    pass
