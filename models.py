from django.db import models

class Comics(models.Model):
    book_name = models.CharField(max_length=100, unique=False, default="")
    book_author = models.CharField(max_length=50, unique=False, default="")
    book_year = models.CharField(max_length=4, default="")
    book_publisher = models.CharField(max_length=25, unique=False, default="")
    created_at = models.DateTimeField(auto_now_add=True)
