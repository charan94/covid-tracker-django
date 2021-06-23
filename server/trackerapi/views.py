import requests
import os
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import models
import json


class GeneralStatsViewSet(viewsets.ModelViewSet):
    queryset = models.GeneralStatistics.objects.all()
    serializer_class = models.GeneralStatisticsSerializer
    permission_classes = []


@api_view(['GET'])
def getGeneralStatistics(request):
    generalStatistics = models.GeneralStatistics.objects.all()
    response = ''
    if generalStatistics.count() == 0:
        result = proxyGeneralStatistics(request)
        print(result)
        if result is not None:
            generalStatistics = models.GeneralStatistics.objects.create(total_cases=result['cases'], recovery_cases=result['recovered'], death_cases=result['deaths'],
                                                                        last_update=result['updated'], currently_infected=result['active'])
            generalStatistics.save()
            generalStatistics = models.GeneralStatistics.objects.all()
    print(generalStatistics)
    serializer = models.GeneralStatisticsSerializer(
        generalStatistics, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getCountryStats(request):
    result = proxyCountryStats()
    return Response(result, status=status.HTTP_200_OK)


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
