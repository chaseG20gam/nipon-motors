from rest_framework import serializers
from .models import Car, Feature, Owner

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'name']

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', 'name', 'email']

class CarSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True, read_only=True)
    owner = OwnerSerializer(read_only=True)

    class Meta:
        model = Car
        fields = ['id', 'brand', 'model', 'year', 'mileage', 'price', 'fuel_type', 'prefecture', 'owner', 'features', 'created_at']