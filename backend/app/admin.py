from django.contrib import admin
from .models import CustomUser, Product, Order, Review, OrderDetail

# Register your models here.
admin.site.register(Product)
admin.site.register(CustomUser)
admin.site.register(Order)
admin.site.register(OrderDetail)
admin.site.register(Review)