from django.urls import path
from .views import IndexEP

urlpatterns = [
    path("", IndexEP),
    path("inventory/", IndexEP),
]