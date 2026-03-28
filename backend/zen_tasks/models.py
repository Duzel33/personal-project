from django.db import models

class Categories(models.Model):
    title = models.CharField(max_length=250)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"
    

class Tasks(models.Model):
    text = models.TextField()
    tasks_author = models.CharField(max_length=250)
    date_created = models.DateTimeField(auto_now_add=True)
    # the comment is dependent on a post existing, so place the foreignkey relationship here
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name="tasks")


    def __str__(self):
        return f"{self.tasks_author}"