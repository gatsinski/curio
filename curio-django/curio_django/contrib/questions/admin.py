from django.contrib import admin
from .models import Question
from curio_django.contrib.answers.models import Answer


class AnswerInine(admin.TabularInline):
    model = Answer


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'author', 'created_at', 'updated_at')
    inlines = (AnswerInine,)
