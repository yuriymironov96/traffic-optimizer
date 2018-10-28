from django_filters import FilterSet

from locations.models import Location


class LocationFilter(FilterSet):

    class Meta:
        model = Location
        fields = '__all__'