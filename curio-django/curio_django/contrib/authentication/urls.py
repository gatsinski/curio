from django.conf.urls import url

from .views import SignInView, SignOutView, SignUpView

urlpatterns = [
    url(r'^sign-in/$',
        SignInView.as_view(),
        name='sign-in'),
    url(r'^sign-out/$',
        SignOutView.as_view(),
        name='sign-out'),
    url(r'^sign-up/$',
        SignUpView.as_view(),
        name='sign-up')
]
