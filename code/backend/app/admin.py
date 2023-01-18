from django.contrib import admin
from .models import CustomUser, Type, Product, Order, Review

# Register your models here.
admin.site.register(Product)
admin.site.register(CustomUser)
admin.site.register(Type)
admin.site.register(Order)
admin.site.register(Review)