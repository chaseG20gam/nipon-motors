from rest_framework import generics, filters, permissions
from .models import Car, Feature, Owner
from .serializers import CarSerializer, FeatureSerializer, OwnerSerializer
from django_filters.rest_framework import DjangoFilterBackend

# car API Views
class CarListCreateAPI(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['brand', 'year', 'fuel_type', 'prefecture']
    search_fields = ['model', 'brand', 'title']
    ordering_fields = ['_price', 'year', '_mileage', 'created_at']
    
    def perform_create(self, serializer):
        # auto assign the current user as owner if no owner specified
        if not serializer.validated_data.get('owner'):
            # future logic to assign owner based on request user?
            pass
        serializer.save()

class CarRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Feature API views
class FeatureListCreateAPI(generics.ListCreateAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class FeatureRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# owner API views
class OwnerListCreateAPI(generics.ListCreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email']

class OwnerRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer