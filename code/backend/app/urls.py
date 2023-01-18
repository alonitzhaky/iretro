from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('register/', views.register),
    path('category/', views.get_category), 
    path('category/<int:id>', views.get_category), 
    path('change-category/', views.change_category), 
    path('change-category/<int:id>', views.change_category), 
    path('product/', views.get_products), 
    path('product/<int:id>', views.get_products), 
    path('change-product/', views.change_products),
    path('change-product/<int:id>', views.change_products), 
    path('reviews/', views.submit_review) 
]
