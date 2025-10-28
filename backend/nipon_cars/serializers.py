from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Car, Feature, Owner

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

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
    published_by = UserSerializer(read_only=True)
    
    # property fields
    mileage = serializers.IntegerField(source='_mileage')
    price = serializers.DecimalField(source='_price', max_digits=10, decimal_places=2)
    
    # features by ID
    feature_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    
    # owner by ID
    owner_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Car
        fields = ['id', 'title', 'brand', 'model', 'year', 'mileage', 'price', 'fuel_type', 'prefecture', 'image', 'owner', 'owner_id', 'features', 'feature_ids', 'published_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        feature_ids = validated_data.pop('feature_ids', [])
        owner_id = validated_data.pop('owner_id', None)
        
        # set published_by to the current user from context
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['published_by'] = request.user
        
        car = Car.objects.create(**validated_data)
        
        if feature_ids:
            car.features.set(feature_ids)
        
        if owner_id:
            try:
                owner = Owner.objects.get(id=owner_id)
                car.owner = owner
                car.save()
            except Owner.DoesNotExist:
                pass
        
        return car
    
    def update(self, instance, validated_data):
        feature_ids = validated_data.pop('feature_ids', None)
        owner_id = validated_data.pop('owner_id', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if feature_ids is not None:
            instance.features.set(feature_ids)
        
        if owner_id is not None:
            try:
                owner = Owner.objects.get(id=owner_id)
                instance.owner = owner
            except Owner.DoesNotExist:
                pass
        
        instance.save()
        return instance