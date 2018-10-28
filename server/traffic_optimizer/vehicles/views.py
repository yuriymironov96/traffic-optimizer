from django.shortcuts import render

from core.views import CoreModelViewSet
from vehicles.models import Vehicle
from vehicles.serializers import VehicleSerializer
from vehicles.filters import VehicleFilter


class VehicleViewSet(CoreModelViewSet):
    model = Vehicle
    serializer_class = VehicleSerializer
    filter_class = VehicleFilter