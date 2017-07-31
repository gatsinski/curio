from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Answer
from .serializers import AnswerSerializer
from rest_framework import status


class AnswerList(APIView):

    def get(self, request, format=None):
        answers = Answer.objects.all()
        serializer_context = {
            'request': request,
        }

        if request.GET.get('question'):
            answers = answers.filter(question=request.GET.get('question'))
        serializer = AnswerSerializer(answers,
                                      many=True,
                                      context=serializer_context)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer_context = {
            'request': request,
        }
        serializer = AnswerSerializer(data=request.data,
                                      context=serializer_context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerDetail(APIView):
    def get_object(self, pk):
        try:
            return Answer.objects.get(pk=pk)
        except Answer.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        answer = self.get_object(pk)
        serializer_context = {
            'request': request,
        }
        serializer = AnswerSerializer(answer, context=serializer_context)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        answer = self.get_object(pk)
        serializer_context = {
            'request': request,
        }
        serializer = AnswerSerializer(answer,
                                      data=request.data,
                                      context=serializer_context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        answer = self.get_object(pk)
        answer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
