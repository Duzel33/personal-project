from rest_framework import serializers
from .models import Tasks, Categories

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ("id", "text", "tasks_author", "date_created", "category")

class CategoriesSerializer(serializers.ModelSerializer):
    tasks = TasksSerializer(many=True, read_only=True)

    class Meta:
        model = Categories
        fields = ("id", "title", "date_created", "tasks")