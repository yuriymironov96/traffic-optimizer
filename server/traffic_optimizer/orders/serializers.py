from rest_framework import serializers

from orders.models import Parcel


class ParcelSerializer(serializers.ModelSerializer):
    departure_point_name = serializers.ReadOnlyField()
    delivery_point_name = serializers.ReadOnlyField()

    class Meta:
        model = Parcel
        fields = '__all__'