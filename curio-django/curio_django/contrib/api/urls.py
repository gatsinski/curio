from django.conf.urls import url, include

from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from curio_django.contrib.questions import views as question_views
from curio_django.contrib.answers import views as answer_views


# API endpoints
urlpatterns = format_suffix_patterns([
    url(r'^$', views.api_root),
    url(r'^questions/$',
        question_views.QuestionList.as_view(),
        name='question-list'),
    url(r'^questions/(?P<pk>[0-9]+)/$',
        question_views.QuestionDetail.as_view(),
        name='question-detail'),

    url(r'^answers/$',
        answer_views.AnswerList.as_view(),
        name='answer-list'),
    url(r'^answers/(?P<pk>[0-9]+)/$',
        answer_views.AnswerDetail.as_view(),
        name='answer-detail'),

    url(r'^users/$',
        views.UserList.as_view(),
        name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)/$',
        views.UserDetail.as_view(),
        name='user-detail'),

    url(r'^authentication/',
        include('curio_django.contrib.authentication.urls')),


])

# Login and logout views for the browsable API
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]
