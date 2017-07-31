from django.db import models
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User


class Question(models.Model):
    text = models.CharField(_('Text'), max_length=254)
    author = models.ForeignKey(User,
                               on_delete=models.SET_NULL,
                               related_name='questions',
                               blank=True,
                               null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.text
