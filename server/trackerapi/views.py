import requests
import os
from django.http import HttpResponse
from django.core import serializers
from . import models
import json


def getGeneralStatistics(request):
    generalStatistics = models.GeneralStatistics.objects.all()
    response = ''
    if generalStatistics.count() == 0:
        result = proxyGeneralStatistics(request)
        print(result);
        if result is not None:
            generalStatistics = models.GeneralStatistics.objects.create(total_cases=result['cases'], recovery_cases=result['recovered'], death_cases=result['deaths'],
                                                                        last_update=result['updated'], currently_infected=result['active'])
            generalStatistics.save()
            generalStatistics = models.GeneralStatistics.objects.all()
    serializedOutput = serializers.serialize(
        'json', [generalStatistics.first()])
    response = HttpResponse(serializedOutput)
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'GET,PUT,POST,OPTIONS'
    return response


def getCountryStats(request):
    response = ''
    result = proxyCountryStats()
    response = HttpResponse(json.dumps(result))
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'GET,PUT,POST,OPTIONS'
    return response


def proxyGeneralStatistics(request):
    url = os.environ['CORONA_STATS_API']
    result = requests.get(
        url + '/all', params=request.GET)
    if result.status_code == 200:
        return result.json()
    else:
        return None


def proxyCountryStats():
    url = os.environ['CORONA_STATS_API'] + '/countries'
    result = requests.get(url)
    if result.status_code == 200:
        return result.json()
    else:
        return None
