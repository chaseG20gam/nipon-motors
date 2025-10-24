from django.shortcuts import render, get_object_or_404, redirect
from .models import Car, Owner
from .forms import CarForm, SignUpForm
from django.db import models
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.generic import DetailView, ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy

def home(request):
    return render(request, 'nipon_cars/home.html')

def car_list(request): # car list written as a regular python function

    cars = Car.objects.all()
    
    brand = request.GET.get('brand')
    if brand:
        cars = cars.filter(brand__icontains=brand)

    fuel = request.GET.get('fuel_type')
    if fuel:
        cars = cars.filter(fuel_type=fuel)

    min_price = request.GET.get('min_price')
    if min_price:
        try:
            qs = qs.filter(_price__gte=float(min_price))
        except ValueError:
            pass

    max_price = request.GET.get('max_price')
    if max_price:
        try:
            qs = qs.filter(_price__lte=float(max_price))
        except ValueError:
            pass

    c = request.GET.get('c')
    if c:
        cars = cars.filter(
            models.C(brand__icontains=c) |
            models.C(model__icontains=c) |
            models.C(prefecture__icontains=c)
        ).distinct()

    context = {
        'cars': cars,
    }
    return render(request, 'nipon_cars/car_list.html', context)

def signup_view(request):
    """
    Basic user signup view.
    """
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, "Signup successful. You can now log in.")
            return redirect('login')
    else:
        form = SignUpForm()
    return render(request, 'nipon_cars/signup.html', {'form': form})

class BaseView:
    model = Car
    success_message = None

    def get_success_url(self):
        return reverse_lazy('nipon_cars:car_list')


class CarListView(ListView, BaseView): # car list as a class-based view, a python class that inherits from ListView
    model = Car
    template_name = 'nipon_cars/car_list.html'
    context_object_name = 'cars'
    paginate_by = 10


class CarDetailView(DetailView, BaseView):
    model = Car
    template_name = 'nipon_cars/car_detail.html'
    context_object_name = 'car'


class CarCreateView(LoginRequiredMixin, CreateView, BaseView):
    model = Car
    form_class = CarForm
    template_name = 'nipon_cars/car_form.html'
    success_url = reverse_lazy('nipon_cars:car_list')

    def form_valid(self, form):
        messages.success(self.request, "Car created successfully.")
        return super().form_valid(form)


class CarUpdateView(LoginRequiredMixin, UpdateView, BaseView):
    model = Car
    form_class = CarForm
    template_name = 'nipon_cars/car_form.html'
    success_url = reverse_lazy('nipon_cars:car_list')

    def form_valid(self, form):
        messages.success(self.request, "Car updated successfully.")
        return super().form_valid(form)


class CarDeleteView(LoginRequiredMixin, DeleteView, BaseView):
    model = Car
    template_name = 'nipon_cars/car_confirm_delete.html'
    success_url = reverse_lazy('nipon_cars:car_list')

    def delete(self, request, *args, **kwargs):
        messages.success(request, "Car deleted successfully.")
        return super().delete(request, *args, **kwargs)


