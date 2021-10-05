import io
from pathlib import Path

from PIL import Image

from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from django.core.files.images import ImageFile

from .models import Conversion
from .convert import FORMATS


class ConversionForm(forms.ModelForm):
    """Model interface for API.
    Form is used for API not user interface."""

    # Form choice field (key: value pairs)
    format_target = forms.ChoiceField(choices=FORMATS.items())

    class Meta:
        model = Conversion
        fields = ["image_source", "image_target"]

    def clean_image_source(self):
        """Validate source image format is supported."""
        # UploadFile
        image_source = self.cleaned_data["image_source"]

        with Image.open(image_source) as i:
            if i.format.lower() not in FORMATS.keys():
                raise ValidationError(
                    _("Source image format is not supported!"), code="invalid"
                )

        return image_source

    def clean(self):
        """Multi-field data validation."""
        # TODO: form-wide validation
        return self.cleaned_data

    def _post_clean(self):
        """Set target image after all validation."""
        self._convert()
        # self.cleaned_data["image_target"] = self._convert()
        super()._post_clean()

    def _convert(self):
        """Convert source image to target format and set target image."""
        image_source = self.cleaned_data["image_source"]
        # format_target is not in cleaned_data (no need to clean)
        format_target = self.data["format_target"]

        with Image.open(image_source) as i:
            # Convert image pixel color mode
            if i.format.lower() == "png":
                i = i.convert("RGB")

            # Make in-memory byte stream for storing target image
            image_target_buffer = io.BytesIO()

            # Convert image format ans save into bytes buffer
            i.save(image_target_buffer, format_target)

            image_target_path = Path(image_source.name).with_suffix(f'.{format_target}')

            # Make Django image file from bytes stream
            image_target = ImageFile(image_target_buffer, str(image_target_path))

            self.cleaned_data["image_target"] = image_target


# class ConversionForm(forms.ModelForm):

#     class Meta:
#         model = Conversion
#         fields = ["id", "account", "image_source", "image_target"]
