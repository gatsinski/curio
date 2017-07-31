from rest_framework import serializers
from .models import Question


class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField(required=True, max_length=255)
    author = serializers.ReadOnlyField(source='author.username')
    answers = serializers.HyperlinkedRelatedField(many=True,
                                                  view_name='answer-detail',
                                                  read_only=True)
    #created_at = serializers.DateTimeField()
    #updated_at = serializers.DateTimeField()

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Question.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.text = validated_data.get('text', instance.text)
        #instance.created_at = validated_data.get('created_at', instance.created_at)
        #instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance

    class Meta:
        model = Question
        fields = ('url', 'id', 'text', 'author', 'answers')
