from turtle import pu
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from itertools import chain
from django.db.models import Q
from .serializers import ComicPrimarySerializer
from .models import Comics


class AddBookEP(APIView):
    serializer_class = ComicPrimarySerializer

    def post(self, request, format=None):
        payload = self.serializer_class(data=request.data)
        if payload.is_valid():
            bn = payload.data.get("book_name")
            ba = payload.data.get("book_author")
            by = payload.data.get("book_year")
            bp = payload.data.get("book_publisher")
            
            record = Comics(book_name=bn, book_author=ba, book_year=by, 
                        book_publisher=bp)
            record.save()
            
            return Response(ComicPrimarySerializer(record).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class SearchBooksEP(APIView):
    lookup_url_kwarg_bn = "bn"
    lookup_url_kwarg_ba = "ba"
    lookup_url_kwarg_by = "by"
    lookup_url_kwarg_bp = "bp"

    def get(self, request, format=None):
        bn = request.GET.get(self.lookup_url_kwarg_bn)
        ba = request.GET.get(self.lookup_url_kwarg_ba)
        by = request.GET.get(self.lookup_url_kwarg_by)
        bp = request.GET.get(self.lookup_url_kwarg_bp)

        name_results = {}
        author_results = {}
        year_results = {}
        pub_results = {}
        
        if bn:
            name_results = Comics.objects.filter(book_name__icontains=bn)
        if ba:
            author_results = Comics.objects.filter(book_author__icontains=ba)
        if by:
            year_results = Comics.objects.filter(book_year=by)
        if bp:
            pub_results = Comics.objects.filter(book_publisher__icontains=bp)

        output_list = list(set(chain(name_results, author_results, year_results, pub_results)))

        if output_list:        
            data = ComicPrimarySerializer(output_list, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        
        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteBookEP(APIView):
    def delete(self, request, id, format=None):
        result = Comics.objects.get(id=id)
        result.delete()

        return Response({ "Message" : "Success" }, status=status.HTTP_201_CREATED)

