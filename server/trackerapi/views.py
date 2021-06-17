from django.shortcuts import render

import requests
from django.http import HttpResponse


def index(request):
    result = requests.get(
        'https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats', params=request.GET)
    response = ''
    if result.status_code == 200:
        response = HttpResponse(result)
    else:
        response = HttpResponse({"status": 500, "message": "Internal Server Error"})
    response['Content-Type'] = 'application/json; charset=utf-8'
    return response
