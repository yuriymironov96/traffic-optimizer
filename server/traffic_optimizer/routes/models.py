from django.db import models

# Create your models here.
class Route:

    def __init__(self, vehicle, stops):
        self.vehicle = vehicle
        self.stops = stops