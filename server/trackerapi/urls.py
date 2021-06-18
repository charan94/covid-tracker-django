from django.urls import path

from . import views

urlpatterns = [
    path('general-stats/', views.getGeneralStatistics, name='getGeneralStatistics'),
    path('country-stats/', views.getCountryStats, name='getCountryStats')
]
