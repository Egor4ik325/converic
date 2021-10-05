from django.db import models
from django.utils.translation import ugettext_lazy as _


class Conversion(models.Model):
    """Model representing conversion made by user.
    Created and saved automatically on convert API request."""

    account = models.ForeignKey(
        "accounts.Account",
        verbose_name=_("account"),
        related_name="conversions",
        on_delete=models.CASCADE,
    )
    image_source = models.ImageField(
        _("source image"),
        upload_to="images/src/",
    )
    image_target = models.ImageField(
        _("target image"),
        upload_to="images/trg/",
        blank=True, # target image will be set after cleaning form fields
    )
    convert_time = models.DateTimeField(_("convert time"), auto_now_add=True)

    def clean(self):
        """All validation is made in the form."""

    class Meta:
        verbose_name = _("conversion")
        verbose_name_plural = _("conversions")

    def __str__(self):
        return self.image_source.name
