from django.contrib import admin
from django.urls import path
from .views import AllCategories, SpecificCategory, AllTasksCat, SpecificTaskCat

urlpatterns = [
    path('categories/', AllCategories.as_view()),
    path('categories/<int:category_id>/', SpecificCategory.as_view()),
    path('categories/<int:category_id>/tasks/', AllTasksCat.as_view()),
    path('categories/<int:category_id>/tasks/<int:task_id>/', SpecificTaskCat.as_view()),
]