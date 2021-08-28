# Converic - Image Conversion Web Service

I don't yet fully understand what this project is going to look like
and what features it will have.

## Description


### What kind of people will use this service?

- People that need quickly convert one image format into another
  without installing any specialized software. Service use cases:
  * convert JPEG image into PNG (to add transparency support)
  * convert ancient file (BMP) format into modern (PNG)
  * convert vector format (SVG) to raster (PNG) (to improve OS support)
  * convert image to GIF (to add animation support)
  * iconize image (ICO)
  * convert browser formats (SVG, WebP) to OS-supported formats
  * pack multiple images into single file (PDF)


### What do I want an **interface** to look like?

- Single-page application
  * user can switch between multiple "pages" (different URLs) on the initial HTML (index.html)
- Upload interface
  * user can select an image or drag'n'drop an image
  * client-side validation should exist for selecting image with 
    valid format, size and other properties
  * click convert button
  * loading arrow should appear to wait a little bit
  * interface should get a response with the path to the converted image
  * converted image should be presented to the user
  * user can download this image

### What will **server actions** look like?

- On request
  * validate & process request, get image, validate image, format
  * make usable image objects for further conversions
  * convert image into specified format
  * some-how save or cache the result converted image for future access
  * save converted image in the file system or/and database row
  * respond with the url to the convrted image on the server

### Where **back-end and front-end** will be located?

- I have chosen **cross-origin** from following options:
  1. Front-end (*static files*) served from back-end
  2. Front-end (server) and back-end on the *same origin* (domain)
  3. Front-end (server) and back-end are *cross-origin* 

### What **features** it will have?

- 3-rd party libraries
  * `django-cors-headers` - for *cross-origin API access* (allowed origins)

### What **file formats** will server support?

- Popular file formats
  * JPEG (JFIF)
  * GIF
  * PNG
  * BMP (Windows)

- Browser formats
  * SVG
  * WebP

- Container formats
  * PDF
  * ICNS
  * ICO
