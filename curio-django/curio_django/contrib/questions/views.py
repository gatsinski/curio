from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response

from curio_django.contrib.questions.models import Question
from curio_django.contrib.questions.serializers import QuestionSerializer
from rest_framework import status


class QuestionList(APIView):

    def get(self, request, format=None):
        questions = Question.objects.all()
        serializer_context = {
            'request': request,
        }

        if request.GET.get('text'):
            questions = questions.filter(text__icontains=request.GET.get('text'))
        serializer = QuestionSerializer(questions,
                                        many=True,
                                        context=serializer_context)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer_context = {
            'request': request,
        }
        serializer = QuestionSerializer(data=request.data,
                                        context=serializer_context)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionDetail(APIView):
    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer_context = {
            'request': request,
        }
        serializer = QuestionSerializer(question, context=serializer_context)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer_context = {
            'request': request,
        }
        serializer = QuestionSerializer(question,
                                        data=request.data,
                                        context=serializer_context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
