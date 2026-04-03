from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Service, Task
from .serializers import ServiceSerializer, TaskSerializer, RegisterSerializer, UserSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import requests
import os


#Authentication
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, username=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status = status.HTTP_200_OK)
        return Response({"error": "Invalid email or passowrd."}, status = status.HTTP_401_UNAUTHORIZED)


# All Services
class AllServices(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        service = Service.objects.all()
        serializer = ServiceSerializer(service, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


# A Specific Service
class SpecificService(APIView):
    permission_classes = [AllowAny]

    def get(self, request, service_id):
        service = get_object_or_404(Service, id=service_id)
        serializer = ServiceSerializer(service)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def put(self, request, service_id):
        service = get_object_or_404(Service, id=service_id)
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, service_id):
        service = get_object_or_404(Service, id=service_id)
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Tasks under a specific Service
class AllTasksCat(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, service_id):
        get_object_or_404(Service, id=service_id)
        task = Task.objects.filter(service_id=service_id, user=request.user)
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def post(self, request, service_id):
        get_object_or_404(Service, id=service_id)
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(service_id=service_id, user=request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    

# A specific comment from the task comments    
class SpecificTaskCat(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, service_id, task_id):
        task = get_object_or_404(Task, id=task_id, service_id=service_id, user=request.user)
        serializer = TaskSerializer(task)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def put(self, request, service_id, task_id):
        task = get_object_or_404(Task, id=task_id, service_id=service_id, user=request.user)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, service_id, task_id):
        task = get_object_or_404(Task, id=task_id, service_id=service_id, user=request.user)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# WEATHER BANNER
class WeatherView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            location_response = requests.get("http://ipwho.is/")
            location_data = location_response.json()

            lat = location_data["latitude"]
            lon = location_data["longitude"]
            city = location_data["city"]
            region = location_data["region"]

            api_key = os.getenv("WEATHER_API_KEY")
            weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=imperial"
            weather_response = requests.get(weather_url)
            weather_data = weather_response.json()

            return Response({
                "city": city,
                "region": region,
                "temperature": round(weather_data["main"]["temp"]),
                "feels_like": round(weather_data["main"]["feels_like"]),
                "description": weather_data["weather"][0]["description"].capitalize(),
                "icon": weather_data["weather"][0]["icon"],
            }, status=status.HTTP_200_OK)
        
        except Exception as err:
            print(f"WEATHER ERROR: {err}")
            return Response({"error": "Could not retrieve weather data."}, status=status.HTTP_400_BAD_REQUEST)