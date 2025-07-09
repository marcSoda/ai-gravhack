from django.db import models
from django.contrib.auth import get_user_model

class BridgeAuth(models.Model):
    bridge_auth_id = models.AutoField(primary_key=True)
    # foreign key into the user table
    django_user = models.OneToOneField(
        get_user_model(),
        on_delete=models.DO_NOTHING,
        blank=False,
        null=False,
        unique=True
    )
    access_token = models.TextField(blank=False, null=False)
    expires_at = models.DateTimeField(blank=False, null=False)

    class Meta:
        managed = True
