from django.contrib.auth.models import User

from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(validated_data.get('username'),
                                        validated_data.get('email'),
                                        validated_data.get('password'))

        return user


class TokenSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=255)
