from django.urls import path
from . import views
from . import api_views

app_name = 'nipon_cars'

urlpatterns = [
    # Home page
    path('home/', views.home, name='home'),
    # FBV for car list with filtering
    path('', views.car_list, name='car_list'),
    # CRUD paths
    path('list/', views.CarListView.as_view(), name='car_list_class'),
    path('car/<int:pk>/', views.CarDetailView.as_view(), name='car_detail'),
    path('car/add/', views.CarCreateView.as_view(), name='car_add'),
    path('car/<int:pk>/edit/', views.CarUpdateView.as_view(), name='car_edit'),
    path('car/<int:pk>/delete/', views.CarDeleteView.as_view(), name='car_delete'),
    # signup view
    path('signup/', views.signup_view, name='signup'),

    # API endpoints
    path('api/cars/', api_views.CarListCreateAPI.as_view(), name='api_car_list'),
    path('api/cars/<int:pk>/', api_views.CarRetrieveUpdateDestroyAPI.as_view(), name='api_car_detail'),
    
    # Feature API endpoints
    path('api/features/', api_views.FeatureListCreateAPI.as_view(), name='api_feature_list'),
    path('api/features/<int:pk>/', api_views.FeatureRetrieveUpdateDestroyAPI.as_view(), name='api_feature_detail'),
    
    # Owner API endpoints
    path('api/owners/', api_views.OwnerListCreateAPI.as_view(), name='api_owner_list'),
    path('api/owners/<int:pk>/', api_views.OwnerRetrieveUpdateDestroyAPI.as_view(), name='api_owner_detail'),
]
'''
VIEWS HTMLS NOT WORKING
'''