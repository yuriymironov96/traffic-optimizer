import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import App from './App.vue';
import '../assets/app.styl';

const instance = axios.create({
                                baseURL: 'http://localhost:8000/api/',
                                timeout: 1000
                              });

checkData('locations/locations/');
checkData('orders/parcels/');
checkData('vehicles/vehicles/');

function checkData(url) {
    instance.get(url)
      .then(function (response) {
          if(!response.data.count) {
              fillData(url);
          }
      })
      .catch(function (error) {
        console.error("Unable to get data" + error);
      });
}

function fillData(url) {
    switch (url) {
        case 'locations/locations':
            fillLocations();
            break;
        case 'orders/parcels/':
            fillOrders();
            break;
        case 'vehicles/vehicles/':
            fillVehicles();
            break;
    }
}

function fillLocations() {
    postRequest('locations/locations/', {
        "name": 'Street #1',
        "address": 'st. Somewhere',
        "longitude": 26.43,
        "latitude": -50.02,
    });

    postRequest('locations/locations/', {
        "name": 'Street #2',
        "address": 'st. Nonewhere',
        "longitude": 73.12,
        "latitude": -86.54,
    });
}

function fillOrders() {
    instance.get('locations/locations/')
    .then(function (response) {
        if(response.data.count < 2) {
            console.log('Not enough locations to form an order');
            return;
        } else {

            console.log(firtsLocation);
            console.log(secondLocation);
            postRequest('orders/parcels/', {
                "customer_phone": '57454354',
                "customer_name": 'Sam',
                "weight": 79,
                "departure_point": 1,
                "delivery_point": 2,
            });

            postRequest('orders/parcels/', {
                "customer_name": 'Liz',
                "customer_phone": '6478942',
                "weight": 62,
                "departure_point": 2,
                "delivery_point": 1,
            });
        }
    })
    .catch(function (error) {
        console.error("Error from locations" + error);
    });
}

function fillVehicles() {
    postRequest('vehicles/vehicles/', {
        "license_plate_number": "42C1",
        "model": 'Honeycomb',
        "vendor": 408,
        "max_load": 3.2,
        "fuel_capacity": 87,
        "fuel_consumption": 6.5
    });

    postRequest('vehicles/vehicles/', {
        "license_plate_number": '98SE2',
        "model": 'Lollipop',
        "vendor": 392,
        "max_load": 0.2,
        "fuel_capacity": 98,
        "fuel_consumption": 0
    });
}

function postRequest(url, data) {
    instance.post(url, data)
      .then(function (response) {
        console.log("Data posted");
      })
      .catch(function (error) {
        console.error("Unable to post data: " + error);
      });
}

Vue.use(Vuetify, {
  iconfont: 'fa'
});

new Vue({
          el    : '#app',
          render: h => h(App)
        });
