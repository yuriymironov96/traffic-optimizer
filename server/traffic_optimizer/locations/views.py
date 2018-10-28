from django.shortcuts import render

from core.views import CoreModelViewSet
from locations.models import Location
from locations.serializers import LocationSerializer
from locations.filters import LocationFilter


class LocationViewSet(CoreModelViewSet):
    model = Location
    serializer_class = LocationSerializer
    filter_class = LocationFilter