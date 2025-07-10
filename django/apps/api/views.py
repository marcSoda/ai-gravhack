import datetime

import json
import requests

from django.http import HttpResponse
from django.http import JsonResponse

from django.db.models import Count
from django.core.cache import cache
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from apps.api.bridge import bridge_start_convo, bridge_send_msg, bridge_get_convo_msgs
from apps.api.decorators import bridge_ensure_auth_decorator

@api_view(['GET'])
def hello_world(req):
    return Response({"message": "Hello from Django!"})

@api_view(['GET'])
@bridge_ensure_auth_decorator
@permission_classes([IsAuthenticated])
def start_convo(req):
    try:
        convo_id = bridge_start_convo(req.user)
        return JsonResponse({"convo_id": convo_id})
    except requests.RequestException as e:
        return JsonResponse({"error": f"External request failed: {str(e)}"}, status=502)
    except Exception as e:
        return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

@api_view(['POST'])
@bridge_ensure_auth_decorator
@permission_classes([IsAuthenticated])
def send_msg(req, convo_id):
    try:
        contents = req.data.get("contents")
        follow_up_count = req.data.get("follow_up_count", None)
        if not contents:
            return JsonResponse({"error": "Missing 'contents' in request body"}, status=400)
        result = bridge_send_msg(req.user, convo_id, contents, follow_up_count)
        return JsonResponse({
            "answer": result["answer"],
            "recommended_follow_ups": result["recommended_follow_ups"]
        })
    except requests.RequestException as e:
        return JsonResponse({"error": f"External request failed: {str(e)}"}, status=502)
    except Exception as e:
        return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

@api_view(['GET'])
@bridge_ensure_auth_decorator
@permission_classes([IsAuthenticated])
def get_convo_msgs(req, convo_id):
    try:
        payload = bridge_get_convo_msgs(req.user, convo_id)
        return JsonResponse({"messages": payload})

    except requests.RequestException as e:
        return JsonResponse({"error": f"External request failed: {str(e)}"}, status=502)

    except Exception as e:
        return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)
