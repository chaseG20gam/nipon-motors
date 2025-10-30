from rest_framework import generics, filters, permissions
from rest_framework.permissions import BasePermission
from .models import Car, Feature, Owner
from .serializers import CarSerializer, FeatureSerializer, OwnerSerializer
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

# custom permission for car ownership
class IsOwnerOrReadOnly(BasePermission):
    """
    custom permission to only allow owners of a car to edit/delete it.
    """
    def has_object_permission(self, request, view, obj):
        # read permissions are allowed to any request, so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # write permissions are only allowed to the owner of the car.
        return obj.published_by == request.user

# custom filter for car model
class CarFilter(django_filters.FilterSet):
    max_price = django_filters.NumberFilter(field_name='_price', lookup_expr='lte')
    min_price = django_filters.NumberFilter(field_name='_price', lookup_expr='gte')
    
    class Meta:
        model = Car
        fields = ['brand', 'year', 'fuel_type', 'prefecture', 'model']

# car API Views
class CarListCreateAPI(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = CarFilter
    search_fields = ['model', 'brand', 'title']
    ordering_fields = ['_price', 'year', '_mileage', 'created_at']
    
    def perform_create(self, serializer):
        # the published_by field is automatically set in the serializer
        serializer.save()

class CarRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class UserCarsListAPI(generics.ListAPIView):
    """
    API endpoint to list cars published by the current authenticated user
    """
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Car.objects.filter(published_by=self.request.user)

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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # permit all to view, only authenticated tto create 
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'email']

class OwnerRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # permit all to view, only authenticated to edit/delete