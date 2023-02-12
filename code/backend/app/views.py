from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from django.shortcuts import redirect, HttpResponse

from .models import Order, Review, Product, CustomUser
from .forms import ReviewForm
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
    # User - check for 'Class'.object (CustomUser, User or AbstactUser)
    user = CustomUser.objects.create_user(
        first_name=request.data["first_name"],
        last_name=request.data["last_name"],
        username=request.data["username"],
        email=request.data["email"],
        password=request.data["password"],
    )

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
        product = Product.objects.get(id = data['id'])
        print(data)
        reviewing_user = CustomUser.objects.get(username = user.username)
        Review.objects.create(
            product = product, 
            user = reviewing_user, 
            customer_name = user.username, 
            rating = data['rating'], 
            description = data['description'])
        return Response("Added.", status = status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status = status.HTTP_401_UNAUTHORIZED)

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

@api_view(['POST'])
def new_order(request):
    serializer = OrderSerializer(
        data=request.data["orderData"], context={"user": request.user}
    )
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        print(serializer.data)
        for item in request.data["orderDetails"]:
            order_dets = {}
            order_dets["product"] = item["id"]
            order_dets["order"] = (
                Order.objects.values_list("id", flat=True)
                .filter(user=request.user.id)
                .last()
            )
            serializer2 = OrderDetailSerializer(data=order_dets)
            if serializer2.is_valid(raise_exception=True):
                serializer2.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)