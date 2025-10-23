from django.contrib import admin
from .models import Car, Owner, Feature, Profile

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model', 'year', 'price', 'mileage', 'fuel_type', 'prefecture', 'owner')
    list_filter = ('fuel_type', 'year', 'prefecture', 'brand')
    search_fields = ('brand', 'model')
    ordering = ('-year',)

@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    search_fields = ('name', 'email')

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'address')