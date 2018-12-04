import Vue from 'vue';
import Router from 'vue-router';
import MainPage from './pages/MainPage.vue';
import HistoryPage from './pages/HistoryPage.vue';
import NewOrderPage from './pages/NewOrderPage.vue';
import OrderPage from './pages/OrderPage.vue';

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
      }
    ]
  }
)
