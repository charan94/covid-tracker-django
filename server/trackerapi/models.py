import uuid
from django.db import models

class GeneralStatistics(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    total_cases = models.TextField(verbose_name= "total_cases")
    recovery_cases = models.TextField(verbose_name= "recovery_cases")
    death_cases = models.TextField(verbose_name= "death_cases")
    last_update = models.TextField(verbose_name= "last_update")
    currently_infected = models.TextField(verbose_name= "currently_infected")
    last_fetched_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}'.format(self.id)


# class CountryStatistics(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     country = models.TextField(verbose_name="country")
#     country_abbreviation = models.TextField(verbose_name="country_abbreviation")
#     total_cases = models.TextField(verbose_name="total_cases")
#     new_cases = models.TextField(verbose_name="new_cases")
#     total_deaths = models.TextField(verbose_name="total_deaths")
#     new_deaths = models.TextField(verbose_name="new_deaths")
#     total_recovered = models.TextField(verbose_name="total_recovered")
#     active_cases = models.TextField(verbose_name="active_cases")
#     serious_critical = models.TextField(verbose_name="serious_critical")
#     cases_per_mill_pop = models.TextField(verbose_name="cases_per_mill_pop")
#     flag = models.TextField(verbose_name="flag")
    
#     def __str__(self):
#         return '{}'.format(self.id)