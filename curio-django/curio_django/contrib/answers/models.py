from django.db import models
from django.utils.translation import ugettext as _
from curio_django.contrib.questions.models import Question


class Answer(models.Model):
    text = models.CharField(_('Text'), max_length=254)
    question = models.ForeignKey(Question,
                                 related_name='answers',
                                 on_delete=models.CASCADE)
    is_correct = models.BooleanField(_('Is correct'), default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
