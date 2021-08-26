import json

from django.views import View
from django.http import HttpResponse, JsonResponse

from .converter import convert


class ConvertView(View):
    """Convert passed image on POST.
    Respond with format options on GET."""

    def get(self, request, *args, **kwargs):
        return HttpResponse("Use POST method!", content_type='text/plain', status=200)

    def post(self, request, *args, **kwargs):
        # Get image from Django file uploads
        image = request.FILES.get('image')

        # Validate request form data
        if image is None:
            return HttpResponse("Image file is required!", content_type="text/html; charset=utf8", status=400)

        # TODO: validate image format (MIME , UploadFile, extension, first bytes)

        # Convert image form PNG to JPEG
        storage_name = convert(image)

        # Return image storage path
        return JsonResponse({'storage_name': storage_name})


def get_csrf(request):
    """Respond with session token for CSRF Auth protection."""
    pass
