from django.db import models


class Parcel(models.Model):
    departure_point = models.ForeignKey(
        'locations.Location',
        related_name='departure_parcels',
        on_delete=models.CASCADE
    )
    delivery_point = models.ForeignKey(
        'locations.Location',
        related_name='delivery_parcels',
        on_delete=models.CASCADE
    )
    customer_phone = models.CharField(
        max_length=20,
    )
    customer_name = models.CharField(
        max_length=256,
    )
    weight = models.DecimalField(
        max_digits=14,
        decimal_places=5,
        default=0,
    )
