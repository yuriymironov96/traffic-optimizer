<template>
  <v-app class="qa-app">
    <Header/>
    <v-container
        pa-0
    >
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import Header from './components/Header.vue'
  import VehicleType from './components/VehicleType.vue'
  import MapComponent from './components/MapComponent.vue'
  import Location from './components/Location.vue'
  import Order from './components/Order.vue'

  export default {
    components: {
      Header,
      VehicleType,
      MapComponent,
      Location,
      Order
    },
    mounted() {
      this.fetchLocations();
      this.fetchVehicles();
      this.fetchOrders();
    },
    computed  : {
      ...mapGetters(['locations', 'startLocation'])
    },
    methods   : {
      ...mapMutations(['setLocations', 'setVehicles', 'setOrders', 'setStartLocation',
                       'setVehicle']),
      fetchLocations() {
        this.$instance.get('locations/locations/')
          .then((response) => {
            if (!response.data.count) {
              this.fillLocations();
            } else {
              this.setLocations(response.data.results);
              this.setStartLocation(response.data.results.find(
                location => location.name === 'Warehouse') || {
                  "name"     : 'Warehouse',
                  "address"  : 'st. Somewhere',
                  "longitude": 30.429656,
                  "latitude" : 50.440638
                });
            }
          })
          .catch(function (error) {
            console.error("Unable to get locations" + error);
          });
      },
      fetchVehicles() {
        this.$instance.get('vehicles/vehicles/')
          .then((response) => {
            if (!response.data.count) {
              this.fillVehicles();
            } else {
              this.setVehicles(response.data.results);
              this.setVehicle(response.data.results[0])
            }
          }).catch(function (error) {
          console.error("Unable to get vehicles" + error);
        });
      },
      fetchOrders() {
        this.$instance.get('orders/parcels/')
          .then((response) => {
            if (!response.data.count) {
              this.fillOrders();
            } else {
              this.setOrders(response.data.results);
            }
          })
          .catch(function (error) {
            console.error("Unable to get orders" + error);
          });
      },
      fillLocations() {
        this.$instance.post('locations/locations/', {
          "name"     : 'Warehouse',
          "address"  : 'st. Somewhere',
          "longitude": 30.429656,
          "latitude" : 50.440638
        });

        this.$instance.post('locations/locations/', {
          "name"     : 'Politechnichna station',
          "address"  : 'Peremogy st',
          "longitude": 30.466568,
          "latitude" : 50.450940
        });

        this.$instance.post('locations/locations/', {
          "name"     : 'Vokzalna station',
          "address"  : 'Polzunkova st',
          "longitude": 30.484881,
          "latitude" : 50.439940
        });
      },
      fillVehicles() {
        this.$instance.post('vehicles/vehicles/', {
          "license_plate_number": "42C1",
          "model"               : 'Honeycomb',
          "vendor"              : 408,
          "max_load"            : 3.2,
          "fuel_capacity"       : 87,
          "fuel_consumption"    : 6.5
        });
        this.$instance.post('vehicles/vehicles/', {
          "license_plate_number": '98SE2',
          "model"               : 'Lollipop',
          "vendor"              : 392,
          "max_load"            : 0.2,
          "fuel_capacity"       : 98,
          "fuel_consumption"    : 0
        });
      },
      fillOrders() {
        if (this.locations.count < 3) {
          console.log('Not enough locations to form an order');
          return;
        } else {
          const endLocation1 = this.locations.find(
            location => location.name === 'Politechnichna station');
          const endLocation2 = this.locations.find(
            location => location.name === 'Vokzalna station');

          this.$instance.post('orders/parcels/', {
            "customer_phone" : '51231',
            "customer_name"  : 'Lebowski',
            "weight"         : 86,
            "departure_point": this.startLocation.id,
            "delivery_point" : endLocation1.id
          });

          this.$instance.post('orders/parcels/', {
            "customer_name"  : 'Elizabeth',
            "customer_phone" : '123432',
            "weight"         : 62,
            "departure_point": this.startLocation.id,
            "delivery_point" : endLocation2.id
          });
        }
      }
    }
  }
</script>

<style lang="stylus">
  .qa-app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50

  #app
    background #e2dcdc

    .container
      margin-top 80px
</style>
