from django.urls import path
from . import views

# Fix urlpatterns for new models

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('register/', views.register),
    path('category/', views.get_products_from_category), 
    path('category/<int:id>', views.get_products_from_category), 
    path('change-category/', views.change_category), 
    path('change-category/<int:id>', views.change_category), 
    path('product/', views.get_products), 
    path('product/<int:id>', views.get_products), 
    path('change-product/', views.change_products),
    path('change-product/<int:id>', views.change_products), 
    path('reviews/', views.submit_review),
    path('profile/', views.get_user_profile),
    path('profile/update/', views.update_user_profile)
]
