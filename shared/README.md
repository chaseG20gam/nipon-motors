# Used Cars - Django Exam Project

This project implements a Used Cars web application for the UF2405 practical exam.

## Features
- Models with OOP principles (BaseEntity, encapsulation, polymorphism).
- Function-based and class-based views.
- Authentication (signup, login, logout).
- Custom forms with validation.
- REST API (DRF) with filtering, search and ordering.
- Admin customization.
- Seed command to create demo data.

## Installation

1. Create and activate a virtualenv:
python -m venv venv
source venv/bin/activate # on Windows: venv\Scripts\activate


2. Install dependencies:
pip install -r requirements.txt


3. Run migrations:
python manage.py makemigrations cars
python manage.py migrate


4. Create superuser:
python manage.py createsuperuser 

(
    user: medjet
    password: medjet
)


5. Seed demo data:
python manage.py seedcars


6. Run server:
python manga.py runserver

7. Demo data and users:

# FOR DEVS:
Commands you'll use:
For Django backend:
For React frontend:
Both will run simultaneously:
Django API: http://localhost:8000
React Frontend: http://localhost:5173