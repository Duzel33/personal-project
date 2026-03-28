from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Categories, Tasks
from .serializers import CategoriesSerializer, TasksSerializer
from rest_framework import status

# All Categories
class AllCategories(APIView):
    def get(self, request):
        category = Categories.objects.all()
        serializer = CategoriesSerializer(category, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CategoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
# A specific Category
class SpecificCategory(APIView):
    def get(self, request, category_id):
        category = Categories.objects.get(id=category_id)
        serializer = CategoriesSerializer(category)
        return Response(serializer.data)
    
    def put(self, request, category_id):
        category = Categories.objects.get(id=category_id)
        request.data["id"] = category_id
        serializer = CategoriesSerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(f'Sucessful put {serializer.data}')
        return Response(f'Failed put {serializer.errors}')

    def delete(self, request, category_id):
        category = Categories.objects.get(id=category_id)
        category.delete()
        return Response(f'Successfully deleted {category}', status=status.HTTP_204_NO_CONTENT)

# Tasks under a specific Category
class AllTasksCat(APIView):
    def get(self, request, category_id):
        tasks = Tasks.objects.filter(category_id=category_id)
        serializer = TasksSerializer(tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request, category_id):
        # request.data["category"] = category_id
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(category_id=category_id)
            return Response(f'Sucessful post {serializer.data}')
        return Response(f'Failed post {serializer.errors}')
    
# A specific comment from the task comments    
class SpecificTaskCat(APIView):
    def get(self, request, category_id, task_id):
        tasks = Tasks.objects.get(id=task_id, category_id=category_id)
        serializer = TasksSerializer(tasks)
        return Response(serializer.data)
    
    def put(self, request, category_id, task_id):
        tasks = Tasks.objects.get(id=task_id, category_id=category_id)
        request.data["id"] = task_id
        request.data["category"] = category_id
        serializer = TasksSerializer(tasks, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(f'Successful put {serializer.data}')
        return Response(f'Failed put {serializer.errors}')

    def delete(self, request, category_id, task_id):
        tasks = Tasks.objects.get(id=task_id, category_id=category_id)
        tasks.delete()
        return Response(f'{tasks} was deleted.', status=status.HTTP_204_NO_CONTENT)