from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Service, Task, User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('phone', 'address')}),
    )
    list_display = ('email', 'first_name', 'last_name', 'phone')
    search_fields = ('email', 'first_name', 'last_name')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_created')
    search_fields = ('title',)
 
 
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('task_author', 'service', 'date_created')
    list_filter = ('service',)
    search_fields = ('task_author', 'text')
