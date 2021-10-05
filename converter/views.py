import json

from django.views import View
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest

from .forms import ConversionForm


class ConvertView(View):
    """Convert passed image on POST.
    Respond with format options on GET.
    """

    def post(self, request, *args, **kwargs):
        """Convert source image to target format (request body)."""
        form = ConversionForm(data=request.POST, files=request.FILES)

        if form.is_valid():
            if request.user.is_authenticated:
                conversion = form.save(commit=False)
                conversion.account = request.user
                conversion.save()
                return JsonResponse({"storage_name": conversion.image_target.name})
            else:
                # TODO: return path to the temporary-stored image
                return HttpResponse()
        else:
            return HttpResponseBadRequest()


def get_supported_formats(request):
    """Return a dictionary of possible conversions between image formats.
    CSRF protection is not required on GET request."""
    if request.method == "GET":
        return JsonResponse(data=SUPPORTED_FORMATS)
    else:
        return HttpResponse(content="Use GET method", status=400)
