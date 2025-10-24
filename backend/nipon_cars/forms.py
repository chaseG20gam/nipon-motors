from django import forms
from .models import Car, Owner
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class CarForm(forms.ModelForm):
    class Meta:
        model = Car
        # use model db column names for fields
        fields = ['title', 'brand', 'model', 'year', '_mileage', '_price', 'fuel_type', 'prefecture', 'owner', 'features']
        widgets = {
            'features': forms.CheckboxSelectMultiple,
        }

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price is not None and price < 0:
            raise forms.ValidationError("Price cannot be negative.")
        return price
    
    def clean_year(self):
        year = self.cleaned_data.get('year')
        if year is not None and (year < 1886 or year > 2100):  # considering first car invented in 1886
            raise forms.ValidationError("Please enter a valid year.")
        return year
    
class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


