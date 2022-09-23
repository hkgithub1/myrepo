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
        
        bname = payload.initial_data.get("book_name")
        bauth = payload.initial_data.get("book_author")
        byear = payload.initial_data.get("book_year")
        bpub = payload.initial_data.get("book_publisher")
        biss = payload.initial_data.get("book_issues")
        bprice = payload.initial_data.get("book_price")
        firstimg = payload.initial_data.get("first_image")
        secondimg = payload.initial_data.get("second_image")
        thirdimg = payload.initial_data.get("third_image")
        fourthimg = payload.initial_data.get("fourth_image")
        fifthimg = payload.initial_data.get("fifth_image")
        sixthimg = payload.initial_data.get("sixth_image")
        seventhimg = payload.initial_data.get("seventh_image")
        eighthimg = payload.initial_data.get("eighth_image")

        
        record = Comics(book_name=bname, book_author=bauth, book_year=byear, 
                    book_publisher=bpub, book_issues=biss, book_price=bprice,                        
                    first_image=firstimg, second_image=secondimg, third_image=thirdimg,
                    fourth_image=fourthimg, fifth_image=fifthimg, sixth_image=sixthimg,
                        seventh_image=seventhimg, eighth_image=eighthimg,
                    )
        record.save()
        
        return Response(ComicPrimarySerializer(record).data, status=status.HTTP_201_CREATED)

        


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

