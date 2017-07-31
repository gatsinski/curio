from django.conf.urls import url

from rest_framework.urlpatterns import format_suffix_patterns

from curio_django.contrib.questions import views


urlpatterns = [
    url(r'^', views.QuestionList2.as_view()),
    url(r'^(?P<pk>[0-9]+)/$', views.QuestionDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
