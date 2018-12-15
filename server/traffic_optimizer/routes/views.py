import googlemaps

from django.db import models
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from orders.models import Parcel
from orders.serializers import ParcelSerializer
from routes.models import Route
from vehicles.models import Vehicle
from vehicles.serializers import VehicleSerializer


class RouteViewSet(viewsets.ViewSet):
    #mapbox_api_key = "sk.eyJ1IjoiaXZhbnphbCIsImEiOiJjanBwdm1sMXkwYTdrNDNvMnF0bmlpN3oxIn0.4ZWNb7MXb-BhnJBwURojNw"

    def list(self, request):
        parcels = Parcel.objects.all()

        origin = (parcels[0].departure_point.latitude,
                  parcels[0].departure_point.longitude)
        waypoints = []

        for parcel in parcels:
            waypoints.append((parcel.delivery_point.latitude,
                              parcel.delivery_point.longitude))
            print(parcel.delivery_point.address)

        google_maps_api_key = "AIzaSyAU-AAp4_uaDAeDzzhdyKZLKCOYaQwapdQ"
        gmaps = googlemaps.Client(key=google_maps_api_key)
        matrix = gmaps.distance_matrix(origin, waypoints)

        distances = {}
        i = 0
        for distance_entry in matrix["rows"][0]["elements"]:
            distances[distance_entry["distance"]["value"]] = waypoints[i]
            i += 1

        finish_point_distance = max(distances, key=int)
        finish_point = distances[finish_point_distance]
        waypoints.remove(finish_point)

        # directions = gmaps.directions(
        #     origin, finish_point, mode="driving", waypoints=waypoints, optimize_waypoints=True)
        # totalDistance = 0
        # legs = directions[0]["legs"]
        # for leg in legs:
        #     totalDistance += leg["distance"]["value"]

        return Response({
            "status": "OK",
            "route": {
                "origin": origin,
                "waypoints": waypoints,
                "destination": finish_point
            }
        })
