from django_filters import FilterSet

from orders.models import Parcel


class ParcelFilter(FilterSet):

    class Meta:
        model = Parcel
        fields = '__all__'