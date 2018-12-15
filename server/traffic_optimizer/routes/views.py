from django.db import models
from django.shortcuts import render
from rest_framework import viewsets

from orders.models import Parcel
from routes.models import Route
from vehicles.models import Vehicle


class RouteViewSet(viewsets.ViewSet):

    def list(self, request):
        vehicles = Vehicle.objects.all()
        parcels = Parcel.objects.all()

        return Response({
            "status": "OK"
        })
