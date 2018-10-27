from django.db import models


class Location(models.Model):
    name = models.CharField(
        max_length=64,
        unique=True,
    )
    address = models.CharField(
        max_length=256,
        unique=True,
    )
    # coordinates = models.CharField(
    #     max_length=256,
    #     unique=True,
    # )