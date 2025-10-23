from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class BaseEntity(models.Model): # abstract base model
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self): # string representation
        return self.title
    
class Profile(models.Model): # user profile model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
class Feature(models.Model): # car feature model (ex. sunroof, navigation, air conditioning...)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Owner(models.Model): # car owner model
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.name
    
class Car(BaseEntity): # car model

    '''main model representing a car with its attributes'''

    FUEL_CHOICES = [
        ('PETROL', 'Petrol'),
        ('DIESEL', 'Diesel'),
        ('ELECTRIC', 'Electric'),
        ('HYBRID', 'Hybrid'),
    ]

    # specific car fields
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    _mileage = models.PositiveIntegerField(db_column='mileage')  # private field with db_column
    _price = models.DecimalField(max_digits=10, decimal_places=2, db_column='price')  # private field with db_column
    fuel_type = models.CharField(max_length=10, choices=FUEL_CHOICES)
    prefecture = models.CharField(max_length=100)
    owner = models.ForeignKey(Owner, on_delete=models.SET_NULL, null=True, blank=True, related_name='cars')
    features = models.ManyToManyField(Feature, blank=True, related_name='cars')

    class Meta:
        ordering = ['-year', 'brand', 'model', ]
    
    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"
    
    # encapsulation with property decorators
    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        if value is None or value < 0:
            raise ValueError('price must be a a valid number')
        self._price = value

    @property
    def mileage(self):
        return self._mileage
    
    @mileage.setter
    def mileage(self, new_mileage):
        if new_mileage is None or new_mileage < 0:
            raise ValueError('mileage must be a valid number')
        if hasattr(self, '_mileage') < self._mileage:
            raise ValueError('mileage cannot be decreased')
        self._mileage = new_mileage

    def Calculate_discount(self, percentage=5):
        discount_amount = (self.price * percentage) / 100
        return float(discount_amount)
    
    def display_info(self): # return a dictionary summarizing the car 

        return {
            'brand': self.brand,
            'model': self.model,
            'year': self.year,
            'price': self.price,
            'mileage': self.mileage,
            'fuel_type': self.fuel_type,
            'prefecture': self.prefecture,
        }
    

    '''
    Notes:
    - baseentity provides title, created_at, updated_at.
    - encapsulation applied to price and mileage (getters, setters).
    - calculate_discount is polymorphic and can be overridden in subclasses if you add special types of cars.
    '''