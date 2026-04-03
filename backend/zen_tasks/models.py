from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


phone_validator = RegexValidator(
    regex=r'^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$',
    message="Phone number must be a valid US format. i.e (123)456-7890"
)

class User(AbstractUser):
    phone = models.CharField(max_length=14, validators=[phone_validator])
    address = models.TextField()

    def __str__(self):
        return f"{self.get_full_name()}"


class Service(models.Model):
    title = models.CharField(max_length=250, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering =['title']

    def __str__(self):
        return f"{self.title}"
    

class Task(models.Model):
    text = models.TextField()
    task_author = models.CharField(max_length=250, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="tasks")

    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return f"{self.task_author}"