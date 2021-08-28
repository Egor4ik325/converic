from io import BytesIO

from PIL import Image
from django.core.files.storage import default_storage

SUPPORTED_FORMATS = {
    'jpeg': ['png', 'webp', 'bmp', 'tiff'],
    'png': ['jpeg', 'webp', 'bmp', 'tiff'],
    'webp': ['jpeg', 'png', 'bmp', 'tiff'],
    'bmp': ['jpeg', 'png', 'webp', 'tiff'],
    'tiff': ['jpeg', 'png', 'webp', 'bmp'],
}


def convert_image_format(i, source_format, target_format):
    """Convert image file from :source_format: to :target_format: format."""

    with Image.open(i) as image:
        # Convert from RGBA to RGB
        if source_format == 'png':
            image = image.convert('RGB')

        # Image bytes buffer
        im_bytes = BytesIO()

        # Convert file format
        image.save(im_bytes, format=target_format)

        # File name without extension
        name = i.name.split('.')[0]

        # Store image in file storage
        storage_name = default_storage.save(
            f'images/{name}.{target_format}', im_bytes)

        return storage_name
