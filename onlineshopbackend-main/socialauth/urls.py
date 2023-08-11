
# urls.py
from django.urls import path
from .views import contact_us

urlpatterns = [
    # Other URLs
    path('contact-us/', contact_us, name='contact-us'),
]
