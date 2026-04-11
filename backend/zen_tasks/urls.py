from django.contrib import admin
from django.urls import path
from .views import AllServices, SpecificService, AllTasksCat, SpecificTaskCat, RegisterView, LoginView, WeatherView, MeView

urlpatterns = [
    path('services/', AllServices.as_view()),
    path('services/<int:service_id>/', SpecificService.as_view()),
    path('services/<int:service_id>/tasks/', AllTasksCat.as_view()),
    path('services/<int:service_id>/tasks/<int:task_id>/', SpecificTaskCat.as_view()),

    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/me/', MeView.as_view()),

    path('weather/', WeatherView.as_view())
]
