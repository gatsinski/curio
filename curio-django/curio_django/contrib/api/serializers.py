from django.contrib.auth.models import User

from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    questions = serializers.HyperlinkedRelatedField(many=True,
                                                    view_name='question-detail',
                                                    read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'questions')
