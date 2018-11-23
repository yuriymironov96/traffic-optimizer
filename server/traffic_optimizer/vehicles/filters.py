from django_filters import FilterSet

from vehicles.models import Vehicle


class VehicleFilter(FilterSet):

    class Meta:
        model = Vehicle
        fields = '__all__'