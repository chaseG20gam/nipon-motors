from rest_framework import generics, filters
from .models import Car
from .serializers import CarSerializer
from django_filters.rest_framework import DjangoFilterBackend

class CarListCreateAPI(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['brand', 'year', 'fuel_type']
    search_fields = ['model', 'brand']
    ordering_fields = ['price', 'year', 'mileage']

class CarRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer