from rest_framework import serializers

from orders.models import Parcel


class ParcelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parcel
        fields = '__all__'