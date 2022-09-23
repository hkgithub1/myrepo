from django.urls import path
from .views import SearchBooksEP, AddBookEP, DeleteBookEP

urlpatterns = [
    path("search-books/", SearchBooksEP.as_view()),
    path("add-book/", AddBookEP.as_view()),
    path("delete-book/<int:id>", DeleteBookEP.as_view()),
]