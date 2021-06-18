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
        if result is not None:
            generalStatistics = models.GeneralStatistics.objects.create(total_cases=result['data']['total_cases'], recovery_cases=result['data']['recovery_cases'], death_cases=result['data']['death_cases'],
                                                                        last_update=result['data']['last_update'], currently_infected=result['data']['currently_infected'], cases_with_outcome=result['data']['cases_with_outcome'], general_death_rate=result['data']['general_death_rate'])
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
    limit = request.GET.get('limit', 8)
    page = request.GET.get('page', 1)
    search = request.GET.get('search')
    searchStr = '?limit='+str(limit)+'&page='+str(page)
    if search is not None:
        searchStr = searchStr + '&search='+str(search)
    result = proxyCountryStats(request, searchStr)
    print('result ' + json.dumps(result))
    response = HttpResponse(json.dumps(result))
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'GET,PUT,POST,OPTIONS'
    return response


def proxyGeneralStatistics(request):
    url = os.environ['CORONA_STATS_API']
    result = requests.get(
        url + '/general-stats', params=request.GET)
    if result.status_code == 200:
        return result.json()
    else:
        return None


def proxyCountryStats(request, searchStr):
    url = os.environ['CORONA_STATS_API'] + '/countries-search' + searchStr
    result = requests.get(url)
    if result.status_code == 200:
        return result.json()
    else:
        return None
