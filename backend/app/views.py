from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

from .models import Order, Review, Product, CustomUser, OrderDetail
from .serializers import (CustomUserSerializer, OrderDetailSerializer, OrderSerializer, ReviewSerializer, ProductSeralizer,)
from .pagination import CustomPageNumberPagination

# ====================================
#           Authentication
# ====================================
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add more properties
        token["username"] = user.username
        token["is_staff"] = user.is_staff
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ====================================
#              Register
# ====================================

@api_view(["POST"])
def register(request):
    data = request.data
    first_name = data["first_name"]
    last_name = data["last_name"]
    username = data["username"]
    email = data["email"]
    password = make_password(data["password"])
    try:
        duplicate_check = CustomUser.objects.get(username=username)
        return Response({"error": "This username already exists. Please select a different username."}, status=status.HTTP_400_BAD_REQUEST)
    except CustomUser.DoesNotExist:
        try:
            duplicate_check = CustomUser.objects.get(email=email)
            return Response(
                {"error": "This email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except CustomUser.DoesNotExist:
            user = CustomUser.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                password=password,
            )
            user.is_active = True
            user.is_staff = False  # To prevent bugs with normal customers
            serializer = CustomUserSerializer(user, many=False)
            return Response(serializer.data)

# ====================================
#            User Profile
# ====================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serilaizer = CustomUserSerializer(user, many=False)
    return Response(serilaizer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = CustomUserSerializer(instance=user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders_for_customer(request):
    user = request.user
    orders = Order.objects.filter(user = user)
    order_details = OrderDetail.objects.filter(order__user=user)
    order_data = OrderSerializer(orders, many=True).data
    order_detail_data = OrderDetailSerializer(order_details, many=True).data
    return Response({"orders": order_data, "order_details": order_detail_data})

# ====================================
#              Products
# ====================================

@api_view(["GET"])
def get_products(request, pk):
    pagination_class = CustomPageNumberPagination
    products = Product.objects.filter(category=pk)
    paginator = pagination_class()
    result_page = paginator.paginate_queryset(products, request)
    serializer = ProductSeralizer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(["GET"])
def one_product(request, pk):
    serializer = ProductSeralizer(Product.objects.get(id=pk), many=False)
    return Response(serializer.data)

# ====================================
#               Reviews
# ====================================

@api_view(["GET"])
def get_reviews_per_product(request, pk):
    reviews = Review.objects.filter(product=Product.objects.get(id=pk))
    serializer = ReviewSerializer(reviews, many=True)
    print("Review call.")
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def submit_review(request):
    data = request.data
    user = request.user
    try:
        product = Product.objects.get(id=data["id"])
        print(data)
        reviewing_user = CustomUser.objects.get(username=user.username)
        Review.objects.create(
            product=product,
            user=reviewing_user,
            customer_name=user.username,
            rating=data["rating"],
            description=data["description"],
        )
        return Response("Added.", status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_products_from_user_order(request):
    user = request.user
    order_details = OrderDetail.objects.filter(order__user=user)
    serializer_order_details = OrderDetailSerializer(order_details, many=True)
    product_list = []
    for i in range(len(serializer_order_details.data)):
        product_list.append(serializer_order_details.data[i]["product"])
    print("Get user order call.")
    return Response(product_list)

# ====================================
#              Orders
# ====================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def new_order(request):
    # Serialize the order data and save the order
    order_serializer = OrderSerializer(
        data=request.data["orderData"], context={"user": request.user}
    )
    order_serializer.is_valid(raise_exception=True)
    order = order_serializer.save()
    print(order_serializer.data)

    # Create a list of order details and save them
    order_details = [
        {
            "product": item["id"],
            "order": order.id,
            "quantity": item["quantity"],
            "total": float(item["price"]) * item["quantity"],
        }
        for item in request.data["orderDetails"]
    ]
    order_detail_serializer = OrderDetailSerializer(data=order_details, many=True)
    order_detail_serializer.is_valid(raise_exception=True)
    order_detail_serializer.save()

    # Calculate the order total and quantity
    order_total = round(sum(detail["total"] for detail in order_details), 2)
    order_quantity = sum(detail["quantity"] for detail in order_details)

    # Update the order with the total and quantity
    order.total = order_total
    order.quantity = order_quantity
    order.save()

    # Serialize and return the order in the response
    response_data = OrderSerializer(order).data
    return Response(response_data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def example_all_orders(request): 
    user = request.user
    orders = Order.objects.filter(user = user)
    orders_serializer = OrderSerializer(orders, many = True).data
    return Response({"orders": orders_serializer})