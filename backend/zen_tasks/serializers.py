from rest_framework import serializers
from .models import Task, Service, User


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email", "phone", "address")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password", "phone", "address")

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data["email"],
            email = validated_data["email"],
            password = validated_data["password"],
            first_name = validated_data["first_name"],
            last_name = validated_data["last_name"],
            phone = validated_data["phone"],
            address = validated_data["address"],
        )
        return user


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("id", "text", "user", "date_created", "service")
        read_only_fields = ("id", "date_created", "user")

class ServiceSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ("id", "title", "date_created", "task")
        read_only_fields = ("id", "date_created")