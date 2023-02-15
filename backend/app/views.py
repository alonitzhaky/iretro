from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from django.shortcuts import redirect, HttpResponse

from .models import Order, Review, Product, CustomUser, OrderDetail
from .serializers import (
    CustomUserSerializer,
    OrderDetailSerializer,
    OrderSerializer,
    ReviewSerializer,
    ProductSeralizer,
)
from .pagination import CustomPageNumberPagination

# Create your views here.

# ~~~~~~~~~~~ Login ~~~~~~~~~~~
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

# ~~~~~~~~~~~ Login ~~~~~~~~~~~

# ~~~~~~~~~~ Register ~~~~~~~~~
@api_view(["POST"])
def register(request):
    data = request.data
    first_name = data["first_name"]
    last_name = data["last_name"]
    username = data["username"]
    email = data["email"]
    password = data["password"]
    try: 
        duplicate_check = CustomUser.objects.get(username = username)
        return Response({"error": "This username already exists. Please select a different username."}, status = status.HTTP_400_BAD_REQUEST)
    except CustomUser.DoesNotExist:
        try: 
            duplicate_check = CustomUser.objects.get(email = email) 
            return Response({"error": "This email already exists."}, status = status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist: 
            user = CustomUser.objects.create(first_name = first_name, last_name = last_name, username = username, email = email, password = password)
            user.is_active = True
            user.is_staff = False  # To prevent bugs with normal customers
            user.save()
            return Response("Created.")


# ~~~~~~~~~~ Register ~~~~~~~~~

# ~~~~~~~~~~ Full CRUD - APIViews ~~~~~~~~~
# Products
# @api_view(["GET"])
# def get_products(request, pk):
#     try:
#         serializer = ProductSeralizer(Product.objects.filter(category=pk), many=True)
#         return Response(serializer.data)
#     except:
#         return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def get_products(request, pk):
    pagination_class = CustomPageNumberPagination
    products = Product.objects.filter(category=pk)
    paginator = pagination_class()
    result_page = paginator.paginate_queryset(products, request)
    serializer = ProductSeralizer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
def all_products(request):
    serializer = ProductSeralizer(Product.objects.all(), many=True)
    return Response(serializer.data)


@api_view(["GET"])
def one_product(request, pk):
    serializer = ProductSeralizer(Product.objects.get(id=pk), many=False)
    return Response(serializer.data)


# @api_view(["POST","DELETE","PUT"])
# @permission_classes([IsAdminUser])
# # Seperate between API Views
# def change_products(request,id=-1):
#     if request.method == "POST":
#         # create varabile with the serialixation type , if it valid we save it to the DB
#         new_product = ProductSeralizer(data=request.data)
#         if new_product.is_valid():
#             new_product.save()
#             return Response(status=status.HTTP_201_CREATED, data=new_product.data)
#         return Response(status=status.HTTP_400_BAD_REQUEST, data="product not valid")
#     # delete by id
#     elif request.method == "DELETE":
#         id_2_del = id
#         try:
#             product = Product.objects.get(id=id_2_del)
#             product.delete()
#         except:
#             return Response(status=status.HTTP_400_BAD_REQUEST, data="product not found")
#         return Response(status=status.HTTP_200_OK, data="product delete")
#     # update by id
#     elif request.method == "PUT":
#         if id == id:
#             ser = ProductSeralizer(data = request.data)
#             old_product = Product.objects.get(id = id)
#             res = ser.update(old_product, request.data)
#             return HttpResponse(res, status = status.HTTP_200_OK)
#         else:
#             return Response(status = status.HTTP_400_BAD_REQUEST, data = "product not found")
# Products

# ~~~~~~~~~~ Reviews ~~~~~~~~~~
@api_view(["GET"])
def get_reviews_per_product(request, pk):
    reviews = Review.objects.filter(product=Product.objects.get(id=pk))
    serializer = ReviewSerializer(reviews, many=True)
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


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_all_products_from_user_order(request):
#     user = request.user
#     product_list = []
#     order = Order.objects.filter(user = user)
#     serializer_order_details = OrderDetailSerializer(order, many = True)
#     for i in range(len(serializer_order_details.data)):
#         print("Blablabla")
#         product_list.append(serializer_order_details.data[i]["product"])
#     return Response(serializer_order_details.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_products_from_user_order(request):
    user = request.user
    order_details = OrderDetail.objects.filter(order__user=user)
    serializer_order_details = OrderDetailSerializer(order_details, many=True)
    product_list = []
    for i in range(len(serializer_order_details.data)):
        product_list.append(serializer_order_details.data[i]["product"])
    return Response(product_list)


# ~~~~~~~~~~ Reviews ~~~~~~~~~

# ~~~~~~~~~~ User Profile ~~~~~~~~~
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


# ~~~~~~~~~~ User Profile ~~~~~~~~~
# @api_view(["POST"])
# def new_order(request):
#     serializer = OrderSerializer(
#         data=request.data["orderData"], context={"user": request.user}
#     )
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         print(serializer.data)
#         for item in request.data["orderDetails"]:
#             order_dets = {}
#             order_dets["product"] = item["id"]
#             order_dets["order"] = (
#                 Order.objects.values_list("id", flat=True)
#                 .filter(user=request.user.id)
#                 .last()
#             )
#             serializer2 = OrderDetailSerializer(data=order_dets)
#             if serializer2.is_valid(raise_exception=True):
#                 serializer2.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def new_order(request): 
#     serializer = OrderSerializer(data = request.data["orderData"], context = {"user": request.user})
#     if serializer.is_valid(raise_exception = True): 
#         order = serializer.save()
#         order_total = 0
#         order_quantity = 0
#         for item in request.data["orderDetails"]: 
#             order_details = {}
#             order_details["product"] = item["id"]
#             order_details["order"] = order.id
#             order_details["quantity"] = item["quantity"]
#             order_details["total"] = float(item["price"]) * item["quantity"]
#             order_total += round(float(order_details["total"]))
#             order_quantity += order_details["quantity"]
#             serializer2 = OrderDetailSerializer(data = order_details)
#             if serializer2.is_valid(raise_exception = True): 
#                 serializer2.save()
#         order.total = order_total
#         order.quantity = order_quantity
#         order.save()
#         return Response(serializer.data, status = status.HTTP_201_CREATED)
#     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def new_order(request):
    # Serialize the order data and save the order
    order_serializer = OrderSerializer(data=request.data["orderData"], context={"user": request.user})
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
