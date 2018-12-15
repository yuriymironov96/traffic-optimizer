import Vue from 'vue';
import Router from 'vue-router';
import MainPage from './pages/MainPage.vue';
import HistoryPage from './pages/HistoryPage.vue';
import NewOrderPage from './pages/NewOrderPage.vue';
import OrderPage from './pages/OrderPage.vue';
import startLocation from './pages/startLocation.vue';
import endLocation from './pages/endLocation.vue';
import vehicleSelection from './pages/vehicleSelection.vue';
import orderSelection from './pages/orderSelection.vue';
import mapComponent from './components/MapComponent.vue';

Vue.use(Router);

export default new Router(
  {
    routes: [
      {
        path     : '/',
        name     : 'mainPage',
        component: MainPage
      },
      {
        path     : '/historyPage',
        name     : 'historyPage',
        component: HistoryPage
      },
      {
        path     : '/newOrderPage',
        name     : 'newOrderPage',
        component: NewOrderPage
      },
      {
        path     : '/orderPage',
        name     : 'orderPage',
        component: OrderPage
      },
      {
        path     : '/startLocation',
        name     : 'startLocation',
        component: startLocation
      },
      {
        path     : '/endLocation',
        name     : 'endLocation',
        component: endLocation
      },
      {
        path     : '/vehicle',
        name     : 'vehicle',
        component: vehicleSelection
      },
      {
        path     : '/order',
        name     : 'order',
        component: orderSelection
      },
      {
        path     : '/map',
        name     : 'map',
        component: mapComponent
      }
    ]
  }
)
