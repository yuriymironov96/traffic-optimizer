from django.shortcuts import render
from django.db import models

from core.views import CoreModelViewSet
from orders.models import Parcel
from orders.serializers import ParcelSerializer
from orders.filters import ParcelFilter


class ParcelViewSet(CoreModelViewSet):
    model = Parcel
    serializer_class = ParcelSerializer
    filter_class = ParcelFilter

    def get_queryset(self, *args, **kwargs):
        return super(ParcelViewSet, self).get_queryset(*args, **kwargs).annotate(
            departure_point_name=models.F('departure_point__name'),
            delivery_point_name=models.F('delivery_point__name')
        )