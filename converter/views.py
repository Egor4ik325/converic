import json

from django.views import View
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest

from .converter import convert_image_format, SUPPORTED_FORMATS


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

        # Validate file is image (by media type)
        if not image.content_type.startswith('image'):
            return HttpResponseBadRequest(f"Sent file is not image: {image.content_type}")

        # Get image file format
        _, image_format = image.content_type.split('/')

        # Validate image format is supported
        if image_format not in SUPPORTED_FORMATS:
            return HttpResponseBadRequest(f"Image format is not supported: {image_format}")

        target_format = request.POST.get('target_format')

        # Validate target image format
        if target_format is None:
            return HttpResponseBadRequest("Target format is not set!")

        # Validate conversion is possible
        if target_format not in SUPPORTED_FORMATS[image_format]:
            return HttpResponseBadRequest(f"Target format is not supported: {target_format}")

        # Convert image form PNG to JPEG
        storage_name = convert_image_format(image, image_format, target_format)

        # Return image storage path
        return JsonResponse({'storage_name': storage_name})


def get_supported_formats(request):
    """Return a dictionary of possible conversions between image formats.
    CSRF protection is not required on GET request."""
    if request.method == 'GET':
        return JsonResponse(data=SUPPORTED_FORMATS)
    else:
        return HttpResponse(content="Use GET method", status=400)
