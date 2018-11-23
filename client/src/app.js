import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import App from './App.vue';
import '../assets/app.styl';

const instance = axios.create({
                                baseURL: 'http://localhost:8000/api',
                                timeout: 1000,
                                headers: {crossDomain: true}
                              });
instance.get('locations/locations')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  });

Vue.use(Vuetify, {
  iconfont: 'fa'
});

new Vue({
          el    : '#app',
          render: h => h(App)
        });
