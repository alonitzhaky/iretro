from rest_framework import serializers
from .models import Type, Product, Order, CustomUser, Review
from rest_framework_simplejwt.tokens import RefreshToken

# ~~~~ Create serializer for new models ~~~~
# Order & User only ones with def create()

class TypeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Type
        fields = '__all__'

class ProductSeralizer(serializers.ModelSerializer): 
    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data): 
        user = self.context['user']
        return Product.objects.create(**validated_data, user = user)

class OrderSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data): 
        user = self.context['user']
        return Order.objects.create(**validated_data, user = user)

class CustomUserSerializer(serializers.ModelSerializer): 
    name = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    admin = serializers.SerializerMethodField(read_only=True)
    class Meta: 
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def get_name(self, object):
        name = object.first_name
        if name == '':
            name = object.email
        return name

    def get_id(self, object):
        return object.id

    def get_admin(self, object):
        return object.is_staff
  
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

class UserSerializerWithToken(CustomUserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'name', 'admin', 'token']

    def get_token(self, object):
        token = RefreshToken.for_user(object)
        return str(token.access_token)