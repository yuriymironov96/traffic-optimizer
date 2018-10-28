from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet


class CoreModelViewSet(ModelViewSet):

    def get_queryset(self):
        return self.model.objects.all()
