from django.urls import path
from . import views

# Fix urlpatterns for new models

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('register/', views.register),
    path('all-products/', views.all_products),     
    path('product/<int:pk>/', views.get_products), 
    path('profile/', views.get_user_profile),
    path('profile/update/', views.update_user_profile),
    path('product/reviews/submit/', views.submit_review),
    path('product/reviews/<int:pk>/', views.get_reviews_per_product), 
    path('product/info/<int:pk>/', views.one_product), 
    path('order/', views.new_order)
]
