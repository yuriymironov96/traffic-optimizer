import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import App from './App.vue';
import router from './router.js'
import store from './store.js'
import '../assets/app.styl';

const instance = axios.create({
                                baseURL: 'http://localhost:8000/api'
                              });

Vue.use(Vuetify, {
  iconfont: 'fa'
});

Vue.prototype.$instance = instance;

new Vue({
  el    : '#app',
  router,
  store,
  render: h => h(App)
 });
