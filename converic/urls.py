"""converic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static


def serve_attachment(request, path, document_root=None, show_indexes=False):
    """Set static.serve response content-disposition: attachement."""
    response = serve(request, path, document_root, show_indexes)
    response.headers['Content-Disposition'] = 'attachment'
    return response


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('converter.urls')),
    path('auth/', include('accounts.urls')),
]

# Serve media files while development
urlpatterns += static(prefix=settings.MEDIA_URL,
                      view=serve_attachment,
                      document_root=settings.MEDIA_ROOT)
