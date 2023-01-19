from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    address = models.CharField(max_length = 150, null = True, blank = True)
    phone_number = models.CharField(max_length = 20, null = True, blank = True)
    age = models.IntegerField(null = True, blank = True)
    location = models.CharField(max_length = 30, blank = True)
    birth_date = models.DateField(null = True, blank = True)

class Type(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model): 
    user = models.ForeignKey(CustomUser, on_delete = models.PROTECT, null = False)
    category = models.ForeignKey(Type, on_delete = models.PROTECT, null = False)
    name = models.CharField(max_length=50)
    price = models.DecimalField(decimal_places = 2, max_digits = 5)
    description = models.CharField(max_length = 200)
    image = models.ImageField(null = False, blank = False, default='placeholder.png')

    def __str__(self):
        return self.name

class Order(models.Model): 
    # ~~~~~ TODO: Test database to check if fields are sufficient. ~~~~
    # product = models.ManyToManyField(Product)
    # ordering_customer = models.ForeignKey(CustomUser, on_delete = models.PROTECT, null = False, related_name = 'customer')
    # customer_address = models.CharField(max_length = 200, null = False)
    # quantity = models.IntegerField(null = False, blank = False)
    id = models.BigAutoField(primary_key = True, unique = True)
    order_date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.id)

class OrderDetails(models.Model): 
    id = models.BigAutoField(primary_key = True, unique = True)
    order_number = models.ForeignKey(Order, on_delete = models.PROTECT, null = False, blank = False)
    customer = models.ForeignKey(CustomUser, on_delete = models.PROTECT, null = False, blank = False)
    products = models.ManyToManyField(Product)
    quantity = models.IntegerField(null = False, blank = False)

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
    product = models.ForeignKey(Product, on_delete = models.PROTECT, null = False)
    rating = models.PositiveSmallIntegerField(choices = RATING_OPTIONS, null = False)
    description = models.CharField(max_length = 500)

    def __str__(self):
        return str(self.order_number)
    