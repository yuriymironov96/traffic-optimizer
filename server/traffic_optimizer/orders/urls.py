from rest_framework import routers
from orders import views

router = routers.DefaultRouter()
router.register(r'parcels', views.ParcelViewSet, basename='parcels')

urlpatterns = router.urls
