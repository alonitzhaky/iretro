from django.contrib import admin
from .models import CustomUser, Type, Product, Order, Review, OrderDetail

# Register your models here.
admin.site.register(Product)
admin.site.register(CustomUser)
admin.site.register(Type)
admin.site.register(Order)
admin.site.register(OrderDetail)
admin.site.register(Review)