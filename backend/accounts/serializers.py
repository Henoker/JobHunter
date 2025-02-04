from rest_framework import serializers 
from .models import * 
from django.contrib.auth import get_user_model 
User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    

    def to_representation(self, instance):
        """Modify representation to include additional user fields."""
        user_data = {
            "id": instance.id,
            "email": instance.email,
            "first_name": instance.first_name,
            "last_name": instance.last_name,
        }
        return user_data


class RegisterSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('id','email','password','first_name', 'last_name')
        extra_kwargs = { 'password': {'write_only':True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "first_name", "last_name"] 