from django.core.management.base import BaseCommand
from nipon_cars.models import Car, Owner, Feature
from django.contrib.auth.models import User
import random
from decimal import Decimal

class Command(BaseCommand):
    help = 'seed the database with sample car data'

    def handle(self, *args, **options):
        # create sample features
        features = ['sunroof', 'navigation', 'air conditioning', 'leather seats', 'backup camera', 'automatic transmision', 'heated seats']
        feature_objs = []
        for name in features:
            feature, _ = Feature.objects.get_or_create(name=name)
            feature_objs.append(feature)

        # create sample owners
        owners = []
        for i in range(5):
            owner, _ = Owner.objects.get_or_create(name=f"Demo Owner {i}", email=f"owner{i}@example.com")
            owners.append(owner)

        # create sample cars
        sample_cars = [
            {'brand': 'Toyota', 'model': 'Corolla', 'year': 2018, 'mileage': 30000, 'price': Decimal('15000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Tokyo'},
            {'brand': 'Honda', 'model': 'Civic', 'year': 2019, 'mileage': 25000, 'price': Decimal('18000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Osaka'},
            {'brand': 'Nissan', 'model': 'Leaf', 'year': 2020, 'mileage': 15000, 'price': Decimal('22000.00'), 'fuel_type': 'ELECTRIC', 'prefecture': 'Kyoto'},
            {'brand': 'Mazda', 'model': 'CX-5', 'year': 2017, 'mileage': 40000, 'price': Decimal('20000.00'), 'fuel_type': 'DIESEL', 'prefecture': 'Hokkaido'},
            {'brand': 'Subaru', 'model': 'Impreza', 'year': 2021, 'mileage': 10000, 'price': Decimal('25000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Fukuoka'},
        ]

        for car_data in sample_cars:
            car, created = Car.objects.get_or_create(
                brand=car_data['brand'],
                model=car_data['model'],
                year=car_data['year'],
                defaults={'_mileage': car_data['mileage'], '_price': car_data['price'], 'fuel_type': car_data['fuel_type'], 'prefecture': car_data['prefecture'], 'owner': random.choice(owners)}
            )
            # assign random features
            car.features.set(random.sample(feature_objs, k=random.randint(1, len(feature_objs))))
            car.save()

        # create a demo user
        if not User.objects.filter(username='demo_user').exists():
            User.objects.create_user('demo', email='demo@example.com', password='demo_password')

        self.stdout.write(self.style.SUCCESS('seed data created successfully'))

        
