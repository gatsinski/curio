from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class CurioDjangoConfig(AppConfig):
    """Main app"""
    name = 'curio_django'
    verbose_name = _('Curio')


class QuestionsConfig(AppConfig):
    name = 'curio_django.contrib.questions'
    verbose_name = _('Questions')


class AnswersConfig(AppConfig):
    name = 'curio_django.contrib.answers'
    verbose_name = _('Answers')
