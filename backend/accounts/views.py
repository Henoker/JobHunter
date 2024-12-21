from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access for registration

    def post(self, request):
        # Serialize incoming data and validate
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Generate JWT tokens
            token = RefreshToken.for_user(user)
            # Return the user data and tokens in response
            data = serializer.data
            data["tokens"] = {
                "refresh": str(token),
                "access": str(token.access_token)
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access for login

    def post(self, request):
        # Serialize login credentials and validate
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            # JWT token is issued and returned in response
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
