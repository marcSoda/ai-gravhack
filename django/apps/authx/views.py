from django.http import JsonResponse
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def login(req):
    data = req.data
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        django_login(req, user)
        return JsonResponse({"status": "succ", "isAuthenticated": True}, status=HTTP_200_OK)
    else:
        return JsonResponse({"status": "err", "msg": "Invalid credentials"}, status=HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def logout(req):
    django_logout(req)
    return JsonResponse({
        "status": "succ",
        "msg": "Successfully logged out"
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_session(_):
    return JsonResponse({"status": "succ", "isAuthenticated": True})
