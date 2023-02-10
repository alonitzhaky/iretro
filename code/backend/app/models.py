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
    image = models.ImageField(null = False, blank = False, default='user_avatar.png')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'phone_number']

class Product(models.Model): 
    CATEGORIES = (
        (1, 'DIY - Do It Yourself'), 
        (2, 'Full Kits'), 
        (3, 'Parts')
    )
    user = models.ForeignKey(CustomUser, on_delete = models.PROTECT, null = False)
    name = models.CharField(max_length=50)
    category = models.PositiveSmallIntegerField(choices = CATEGORIES)
    price = models.DecimalField(decimal_places = 2, max_digits = 7, validators = [MinValueValidator(Decimal('0.01'))])
    description = models.CharField(max_length = 200)
    quantity = models.IntegerField(null = False, blank = False, validators=[MinValueValidator(0)], default = 0)
    image = models.ImageField(null = False, blank = False, default='placeholder.png')

    def __str__(self):
        return self.description

class Order(models.Model): 
    id = models.BigAutoField(primary_key = True)
    user = models.ForeignKey(CustomUser, on_delete = models.PROTECT, default = 1)
    order_date = models.DateTimeField(auto_now_add = True)
    address = models.CharField(max_length = 100, null = False, blank = True)
    city = models.CharField(max_length = 100, null = False, blank = True)
    country = models.CharField(max_length = 50, null = False, blank = True)
    zip_code = models.CharField(max_length = 15, null = False, blank = False)

    def __str__(self):
        return str(self.id)

class OrderDetail(models.Model): 
    id = models.BigAutoField(primary_key = True, unique = True)
    order = models.ForeignKey(Order, on_delete = models.PROTECT, null = False, blank = False)
    product = models.ForeignKey(Product, on_delete = models.PROTECT, null = True)
    quantity = models.IntegerField(null = True, blank = True, validators=[MinValueValidator(1)])
    total = models.DecimalField(max_digits = 7, decimal_places = 2, null = True)

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
    customer_name = models.CharField(max_length = 100, null = False, blank = False)
    product = models.ForeignKey(Product, on_delete = models.PROTECT)
    rating = models.PositiveSmallIntegerField(choices = RATING_OPTIONS, null = False)
    description = models.CharField(max_length = 500)

    def __str__(self):
        return str(self.rating)
    