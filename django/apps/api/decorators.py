from functools import wraps
from django.contrib.auth.decorators import login_required
from apps.api.bridge import bridge_ensure_auth
from django.contrib.auth import get_user_model

BRIDGE_URL = "https://dev-api.remark.cloud/ai/authenticate"

def bridge_ensure_auth_decorator(view_func):
    @wraps(view_func)
    # @login_required
    def _wrapped_view(req, *args, **kwargs):
        user = get_user_model().objects.first()
        bridge_ensure_auth(user)
        return view_func(req, *args, **kwargs)
    return _wrapped_view
