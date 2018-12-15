from rest_framework import routers
from routes import views

router = routers.DefaultRouter()
router.register(r'routes', views.RouteViewSet, basename='routes')

urlpatterns = router.urls
