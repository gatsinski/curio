from django.db import models
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User
from django.core.signing import TimestampSigner


class Token(models.Model):
    token = models.CharField(_('Token'), max_length=254)
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL,
                             related_name='tokens')
    is_valid = models.BooleanField(_('Is valid'), default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def generate_token(self, *args, **kwargs):
        signer = TimestampSigner()
        return signer.sign(self.user.username)
