from rest_framework import serializers
from .models import Comics


class ComicPrimarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Comics
        fields = ("id", "book_name", "book_author", "book_year", "book_publisher",
                    "book_issues", "book_price", "first_image", "second_image", "third_image",
                    "fourth_image", "fifth_image", "sixth_image", "seventh_image", "eighth_image"
                    )



        
