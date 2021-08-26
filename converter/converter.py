from io import BytesIO

from PIL import Image
from django.core.files.storage import default_storage


def convert(i):
    """Convert image file from PNG to JPEG format."""

    with Image.open(i) as image:
        # Convert from RGBA to RGB
        im = image.convert('RGB')

        # Image bytes buffer
        im_bytes = BytesIO()

        # Convert file format
        im.save(im_bytes, format='jpeg')

        # Store image in file storage
        storage_name = default_storage.save(
            f'images/{i.name[:-4]}.jpeg', im_bytes)

        return storage_name
