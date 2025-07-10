import requests
from datetime import datetime, timedelta
from django.utils.timezone import now
from functools import wraps
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from apps.api.models import BridgeAuth

TIMEOUT=30
BRIDGE_URL = "https://142b805cbbae.ngrok-free.app/ai"
AUTH_ROUTE = "authenticate"
AI_ROUTE = "azure_open_ai/v1/shadowbase"
START_CONVO_ROUTE = "start-conversation"
FOLLOW_UP_COUNT_QUERY_PARAM = "?followUpCount="

def bridge_ensure_auth(user):
    bridge_auth = BridgeAuth.objects.filter(django_user=user).first()

    if not bridge_auth or bridge_auth.expires_at <= now():
        try:
            url = f"{BRIDGE_URL}/{AUTH_ROUTE}"
            response = requests.post(url, timeout=TIMEOUT)
            response.raise_for_status()
            data = response.json()

            access_token = data.get("accessToken")
            expires_in = int(data.get("expiresIn", 0))

            if not access_token or not expires_in:
                return JsonResponse({"error": "Invalid response from auth server"}, status=502)

            expires_at = now() + timedelta(seconds=expires_in)

            BridgeAuth.objects.update_or_create(
                django_user=user,
                defaults={
                    "access_token": access_token,
                    "expires_at": expires_at
                }
            )

        except (requests.RequestException, ValueError) as e:
            return JsonResponse({"error": f"Authentication failed: {str(e)}"}, status=502)

def bridge_start_convo(user):
    bridge_auth = BridgeAuth.objects.get(django_user=user)

    headers = {
        "Authorization": f"Bearer {bridge_auth.access_token}",
        "Accept": "application/json"
    }

    url = f"{BRIDGE_URL}/{AI_ROUTE}/{START_CONVO_ROUTE}"
    response = requests.get(url, headers=headers, timeout=TIMEOUT)
    response.raise_for_status()

    data = response.json()
    convo_id = data.get("payload", {}).get("id")

    if not convo_id:
        raise Exception("convo_id missing from payload")

    return convo_id

def bridge_send_msg(user, convo_id, contents, follow_up_count):
    bridge_auth = BridgeAuth.objects.get(django_user=user)

    headers = {
        "Authorization": f"Bearer {bridge_auth.access_token}",
        "Content-Type": "application/json"
    }
    payload = {"contents": contents}

    url = f"{BRIDGE_URL}/{AI_ROUTE}/{convo_id}"
    if follow_up_count is not None:
        url += f"?{FOLLOW_UP_COUNT_QUERY_PARAM}={follow_up_count}"

    response = requests.post(url, headers=headers, json=payload, timeout=TIMEOUT)
    response.raise_for_status()

    data = response.json()
    payload_data = data.get("payload", {})

    return {
        "answer": payload_data.get("contents"),
        "recommended_follow_ups": payload_data.get("recommendedFollowUps", [])
    }

def bridge_get_convo_msgs(user, convo_id):
    bridge_auth = BridgeAuth.objects.get(django_user=user)

    headers = {
        "Authorization": f"Bearer {bridge_auth.access_token}",
        "Accept": "application/json"
    }

    url = f"{BRIDGE_URL}/{AI_ROUTE}/{convo_id}"
    response = requests.get(url, headers=headers, timeout=TIMEOUT)
    response.raise_for_status()

    data = response.json()
    raw_messages = data.get("payload", {}).get("messages", [])

    simplified_messages = []
    for msg in raw_messages:
        msg_type = "answer" if str(msg.get("senderId", "")).startswith("agent:") else "question"
        simplified_messages.append({
            "id": msg.get("id"),
            "contents": msg.get("contents"),
            "type": msg_type
        })

    return simplified_messages
