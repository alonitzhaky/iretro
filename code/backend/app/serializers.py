from rest_framework import serializers
from .models import Type, Product, Order, CustomUser, Review

# Order & User only ones with def create()

class TypeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Type
        fields = '__all__'

class ProductSeralizer(serializers.ModelSerializer): 
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data): 
        user = self.context['user']
        return Order.objects.create(**validated_data, user = user)

class CustomUserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = CustomUser
        fields = '__all__'

    def create(self, validated_data): 
        user = self.context['user']
        return CustomUser.objects.create(**validated_data, user = user)

class ReviewSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Review
        fields = '__all__'

    def create(self, validated_data): 
        user = self.context['user']
        return Review.objects.create(**validated_data, user = user)
