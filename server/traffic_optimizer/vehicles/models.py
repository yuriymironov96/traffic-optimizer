from django.db import models


class Vehicle(models.Model):
    license_plate_number = models.CharField(
        max_length=8,
        unique=True,
    )
    model = models.CharField(
        max_length=256,
    )
    vendor = models.CharField(
        max_length=256,
    )
    max_load = models.DecimalField(
        max_digits=14,
        decimal_places=5,
        default=0,
    )
    fuel_consumption = models.DecimalField(
        max_digits=14,
        decimal_places=5,
        default=0,
    )
    fuel_capacity = models.DecimalField(
        max_digits=14,
        decimal_places=5,
        default=0,
    )
