# serializers.py
from rest_framework import serializers
from .models import ContactSubmission
from django.contrib.auth.models import User

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ('name', 'email', 'message')
