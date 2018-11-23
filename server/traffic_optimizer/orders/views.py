from django.shortcuts import render

from core.views import CoreModelViewSet
from orders.models import Parcel
from orders.serializers import ParcelSerializer
from orders.filters import ParcelFilter


class ParcelViewSet(CoreModelViewSet):
    model = Parcel
    serializer_class = ParcelSerializer
    filter_class = ParcelFilter