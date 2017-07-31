from django.contrib.auth import authenticate, login, logout

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import TokenSerializer, UserSerializer


class SignInView(APIView):

    def post(self, request, format=None):
        serializer_context = {
            'request': request,
        }
        serializer = TokenSerializer(data=request.data,
                                     context=serializer_context)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user and user.is_active:
                login(request, user)
                request.session['temp'] = 'baaaab'
                response_data = {'success': True,
                                 'is_staff': user.is_staff}
                return Response(response_data,
                                status=status.HTTP_200_OK)
            else:
                response_data = {'success': False}
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_200_OK)


class SignOutView(APIView):

    def post(self, request, format=None):
        logout(request)
        return Response({'success': True}, status=status.HTTP_200_OK)


class SignUpView(APIView):

    def post(self, request, format=None):
        serializer_context = {
            'request': request,
        }
        serializer = UserSerializer(data=request.data,
                                    context=serializer_context)
        if serializer.is_valid():
            serializer.save()

            response_data = {'success': True}
            return Response(response_data,
                            status=status.HTTP_200_OK)
        else:
            response_data = {'success': False, 'errors': serializer.errors}
        return Response(response_data, status=status.HTTP_200_OK)
