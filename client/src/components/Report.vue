<template>
    <v-slide-x-transition>

        <v-card >
            <MapComponent :locations="[from, to]" :predefined="true"/>
            <v-card-title primary-title>
                <div class="text-xs-left">
                    <div class="headline"><span class="font-weight-bold">Customer: </span>{{order.customer_name}}</div>
                    <p class="mb-0 grey--text">Phone: {{order.customer_phone}}</p>
                    <p class="mb-0 grey--text">Date: 20-10-18</p>
                </div>
            </v-card-title>
            <v-card-text class="text-xs-left">
                <p><span class="font-weight-bold">From: </span> {{`${from.name} ${from.address}`}}</p>
                <p><span class="font-weight-bold">To: </span> {{`${to.name} ${to.address}`}}</p>
                <p><span class="font-weight-bold">Weight: </span> {{parseFloat(order.weight).toFixed(2)}}</p>
                <p><span class="font-weight-bold">Transport: </span> {{`${vehicle.model} ${vehicle.vendor}`}}</p>
                <p><span class="font-weight-bold">Status: </span> Finished</p>
            </v-card-text>
        </v-card>
    </v-slide-x-transition>
</template>
<script>
  import MapComponent from "./MapComponent.vue";
  import { mapGetters } from 'vuex';

    export default {
      components: {MapComponent},
        name: 'Report',
        props: {
            loadingReport: {}
        },
      // data () {
      //     return {
      //       fromCoord: {
      //         latitude: 50.440638,
      //         longitude: 30.429656
      //       },
      //       toCoord: {
      //         latitude: 50.450940,
      //         longitude: 30.466568
      //       }
      //     }
      // },
      computed: {
        ...mapGetters(['locations', 'vehicle', 'order']),
        from () {
          return this.locations.find(location => location.id === this.order.departure_point);
        },
        to () {
          return this.locations.find(
            location => location.id === this.order.delivery_point);
        }
      }
    }
</script>
