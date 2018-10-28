from rest_framework import routers
from locations import views

router = routers.DefaultRouter()
router.register(r'locations', views.LocationViewSet, basename='locations')

urlpatterns = router.urls
