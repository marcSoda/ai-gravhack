from django.urls import path
from .views import hello_world, send_msg, start_convo, get_convo_msgs

urlpatterns = [
    path('hello/', hello_world),

    path('start-convo/', start_convo),
    path('send-msg/<str:convo_id>', send_msg),
    path('get-convo-msgs/<str:convo_id>', get_convo_msgs),
]
