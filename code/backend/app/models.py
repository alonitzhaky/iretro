from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from decimal import Decimal

# Create your models here.
class CustomUser(AbstractUser):
    address = models.CharField(max_length = 150, null = True, blank = True)
    phone_number = models.CharField(max_length = 20, null = True, blank = True)
    age = models.IntegerField(null = True, blank = True)
    location = models.CharField(max_length = 30, blank = True)
    birthday = models.DateField(null = True, blank = True)

class Type(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model): 
    user = models.ForeignKey(CustomUser, on_delete = models.PROTECT, null = False)
    category = models.ForeignKey(Type, on_delete = models.PROTECT, null = False)
    name = models.CharField(max_length=50)
    price = models.DecimalField(decimal_places = 2, max_digits = 5, validators = [MinValueValidator(Decimal('0.01'))])
    description = models.CharField(max_length = 200)
    image = models.ImageField(null = False, blank = False, default='placeholder.png')

    def __str__(self):
        return self.name

class Order(models.Model): 
    id = models.BigAutoField(primary_key = True)
    customer = models.ForeignKey(CustomUser, on_delete = models.PROTECT, default = 1)
    order_date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.id)

class OrderDetail(models.Model): 
    id = models.BigAutoField(primary_key = True, unique = True)
    order_number = models.ForeignKey(Order, on_delete = models.PROTECT, null = False, blank = False)
    customer = models.ForeignKey(CustomUser, on_delete = models.PROTECT, null = False, blank = False)
    products = models.ManyToManyField(Product)
    quantity = models.IntegerField(null = False, blank = False, validators=[MinValueValidator(1)])

    def __str__(self): 
        return str(self.order_number)

class Review(models.Model):
    RATING_OPTIONS = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    )
    user = models.ForeignKey(CustomUser, on_delete = models.PROTECT, null = False)
    order_number = models.ForeignKey(Order, on_delete = models.PROTECT, null = False)
    product = models.ManyToManyField(Product)
    rating = models.PositiveSmallIntegerField(choices = RATING_OPTIONS, null = False)
    description = models.CharField(max_length = 500)

    def __str__(self):
        return str(self.order_number)
    