from django.core.management.base import BaseCommand
from nipon_cars.models import Car, Owner, Feature
from django.contrib.auth.models import User
import random
from decimal import Decimal

class Command(BaseCommand):
    help = 'seed the database with sample car data'

    def handle(self, *args, **options):
        # create sample features
        features = [
            'sunroof', 'navigation', 'air conditioning', 'leather seats', 'backup camera', 
            'automatic transmission', 'heated seats', 'cruise control', 'bluetooth', 
            'parking sensors', 'keyless entry', 'alloy wheels', 'fog lights', 
            'tinted windows', 'premium sound system', 'lane departure warning',
            'blind spot monitoring', 'adaptive cruise control', 'heated steering wheel',
            'memory seats', 'ambient lighting', 'wireless charging', 'head-up display',
            'panoramic roof', 'ventilated seats', 'massage seats', 'premium interior',
            'carbon fiber trim', 'sport suspension', 'performance exhaust', 'turbo engine',
            'all-wheel drive', 'limited slip differential', 'racing seats', 'roll cage'
        ]
        feature_objs = []
        for name in features:
            feature, _ = Feature.objects.get_or_create(name=name)
            feature_objs.append(feature)

        # create sample owners
        owners = []
        for i in range(10):
            owner, _ = Owner.objects.get_or_create(name=f"Demo Owner {i}", email=f"owner{i}@example.com")
            owners.append(owner)

        # create sample cars with diverse selection
        sample_cars = [
            # original cars
            {'brand': 'Toyota', 'model': 'Corolla', 'year': 2018, 'mileage': 30000, 'price': Decimal('15000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Tokyo'},
            {'brand': 'Honda', 'model': 'Civic', 'year': 2019, 'mileage': 25000, 'price': Decimal('18000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Osaka'},
            {'brand': 'Nissan', 'model': 'Leaf', 'year': 2020, 'mileage': 15000, 'price': Decimal('22000.00'), 'fuel_type': 'ELECTRIC', 'prefecture': 'Kyoto'},
            {'brand': 'Mazda', 'model': 'CX-5', 'year': 2017, 'mileage': 40000, 'price': Decimal('20000.00'), 'fuel_type': 'DIESEL', 'prefecture': 'Hokkaido'},
            {'brand': 'Subaru', 'model': 'Impreza', 'year': 2021, 'mileage': 10000, 'price': Decimal('25000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Fukuoka'},
            
            # classic JDM Legends
            {'brand': 'Nissan', 'model': 'Skyline GT-R R34', 'year': 1999, 'mileage': 85000, 'price': Decimal('120000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Tokyo'},
            {'brand': 'Toyota', 'model': 'Supra MK4', 'year': 1997, 'mileage': 95000, 'price': Decimal('95000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Osaka'},
            {'brand': 'Honda', 'model': 'NSX NA1', 'year': 1991, 'mileage': 120000, 'price': Decimal('85000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Kyoto'},
            {'brand': 'Mazda', 'model': 'RX-7 FD', 'year': 1995, 'mileage': 105000, 'price': Decimal('55000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Hiroshima'},
            {'brand': 'Mitsubishi', 'model': 'Lancer Evolution IX', 'year': 2006, 'mileage': 75000, 'price': Decimal('45000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Tokyo'},
            {'brand': 'Subaru', 'model': 'Impreza WRX STI', 'year': 2004, 'mileage': 90000, 'price': Decimal('35000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Fukuoka'},
            
            # affordable Modern Cars
            {'brand': 'Suzuki', 'model': 'Swift Sport', 'year': 2020, 'mileage': 15000, 'price': Decimal('16000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Osaka'},
            {'brand': 'Daihatsu', 'model': 'Copen', 'year': 2019, 'mileage': 20000, 'price': Decimal('14000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Kyoto'},
            {'brand': 'Honda', 'model': 'Fit Hybrid', 'year': 2021, 'mileage': 8000, 'price': Decimal('18000.00'), 'fuel_type': 'HYBRID', 'prefecture': 'Tokyo'},
            {'brand': 'Toyota', 'model': 'Yaris', 'year': 2020, 'mileage': 12000, 'price': Decimal('16500.00'), 'fuel_type': 'HYBRID', 'prefecture': 'Osaka'},
            {'brand': 'Nissan', 'model': 'Note e-Power', 'year': 2021, 'mileage': 5000, 'price': Decimal('19000.00'), 'fuel_type': 'HYBRID', 'prefecture': 'Tokyo'},
            
            # premium Luxury Cars
            {'brand': 'Lexus', 'model': 'LS 500', 'year': 2022, 'mileage': 3000, 'price': Decimal('75000.00'), 'fuel_type': 'HYBRID', 'prefecture': 'Tokyo'},
            {'brand': 'Infiniti', 'model': 'Q70', 'year': 2020, 'mileage': 18000, 'price': Decimal('42000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Osaka'},
            {'brand': 'Acura', 'model': 'NSX', 'year': 2019, 'mileage': 8000, 'price': Decimal('140000.00'), 'fuel_type': 'HYBRID', 'prefecture': 'Tokyo'},
            {'brand': 'Lexus', 'model': 'LC 500', 'year': 2021, 'mileage': 5000, 'price': Decimal('92000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Kyoto'},
            
            # modern Utility & Family Cars
            {'brand': 'Honda', 'model': 'CR-V Hybrid', 'year': 2022, 'mileage': 8000, 'price': Decimal('32000.00'), 'fuel_type': 'HYBRID', 'prefecture': 'Tokyo'},
            {'brand': 'Toyota', 'model': 'RAV4', 'year': 2021, 'mileage': 12000, 'price': Decimal('28000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Osaka'},
            {'brand': 'Subaru', 'model': 'Forester', 'year': 2020, 'mileage': 25000, 'price': Decimal('26000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Hokkaido'},
            {'brand': 'Mazda', 'model': 'CX-9', 'year': 2021, 'mileage': 15000, 'price': Decimal('35000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Osaka'},
            {'brand': 'Honda', 'model': 'Pilot', 'year': 2020, 'mileage': 22000, 'price': Decimal('33000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Tokyo'},
            
            # very Expensive Supercars & Rare Cars
            {'brand': 'Nissan', 'model': 'GT-R NISMO', 'year': 2023, 'mileage': 500, 'price': Decimal('180000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Tokyo'},
            {'brand': 'Honda', 'model': 'NSX Type S', 'year': 2022, 'mileage': 1200, 'price': Decimal('165000.00'), 'fuel_type': 'HYBRID', 'prefecture': 'Tokyo'},
            {'brand': 'Lexus', 'model': 'LFA', 'year': 2012, 'mileage': 8500, 'price': Decimal('450000.00'), 'fuel_type': 'PETROL', 'prefecture': 'Tokyo'},
        ]

        for car_data in sample_cars:
            car, created = Car.objects.get_or_create(
                brand=car_data['brand'],
                model=car_data['model'],
                year=car_data['year'],
                defaults={
                    '_mileage': car_data['mileage'], 
                    '_price': car_data['price'], 
                    'fuel_type': car_data['fuel_type'], 
                    'prefecture': car_data['prefecture'], 
                    'owner': random.choice(owners),
                    'title': f"{car_data['brand']} {car_data['model']} ({car_data['year']})"
                }
            )
            
            if created:
                # assign features based on car type and price
                price_value = float(car_data['price'])
                if price_value > 100000:  # Super expensive cars
                    selected_features = random.sample(feature_objs, k=random.randint(15, len(feature_objs)))
                elif price_value > 50000:  # Premium cars
                    selected_features = random.sample(feature_objs, k=random.randint(10, 18))
                elif price_value > 30000:  # Mid-range cars
                    selected_features = random.sample(feature_objs, k=random.randint(7, 12))
                else:  # affordable cars
                    selected_features = random.sample(feature_objs, k=random.randint(3, 8))
                
                car.features.set(selected_features)
                car.save()
                self.stdout.write(f"Created: {car.title}")
            else:
                self.stdout.write(f"Already exists: {car.title}")

        # create a demo user
        if not User.objects.filter(username='demo').exists():
            User.objects.create_user('demo', email='demo@example.com', password='demo_password')
            self.stdout.write("Created demo user")
        else:
            self.stdout.write("Demo user already exists")

        self.stdout.write(self.style.SUCCESS('seed data created successfully'))

        
