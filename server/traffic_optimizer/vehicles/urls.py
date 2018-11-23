from rest_framework import routers
from vehicles import views

router = routers.DefaultRouter()
router.register(r'vehicles', views.VehicleViewSet, basename='vehicles')

urlpatterns = router.urls
