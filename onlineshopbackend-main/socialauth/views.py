from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import ContactSubmissionSerializer

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def contact_us(request):
    if request.method == 'GET':
        # Handle GET request to retrieve contact information or render the contact form
        # ...

        return Response({'message': 'Contact information or form rendered'})

    elif request.method == 'POST':
        serializer = ContactSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'Thank you for contacting us'})
        return Response(serializer.errors, status=400)
