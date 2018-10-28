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
    longitude = models.DecimalField(
        max_digits=10,
        decimal_places=6,
        default=0,
    )
    latitude = models.DecimalField(
        max_digits=10,
        decimal_places=6,
        default=0,
    )