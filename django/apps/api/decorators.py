from functools import wraps
from django.contrib.auth.decorators import login_required
from apps.api.bridge import bridge_ensure_auth

BRIDGE_URL = "https://843960beb1cb.ngrok-free.app/ai/authenticate"

def bridge_ensure_auth_decorator(view_func):
    @wraps(view_func)
    @login_required
    def _wrapped_view(req, *args, **kwargs):
        bridge_ensure_auth(req.user)
        return view_func(req, *args, **kwargs)
    return _wrapped_view
