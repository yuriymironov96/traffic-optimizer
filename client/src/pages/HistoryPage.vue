<template>
  <v-slide-x-transition>
    <v-layout wrap>
      <v-flex xs12>
        <Location />
      </v-flex>
      <v-flex xs12>
        <VehicleType />
      </v-flex>
      <v-flex xs12>
        <Order />
      </v-flex>
    </v-layout>
  </v-slide-x-transition>
</template>

<script>
  import VehicleType from '../components/VehicleType.vue'
  import MapComponent from '../components/MapComponent.vue'
  import Location from '../components/Location.vue'
  import Order from '../components/Order.vue'

  export default {
    name: "HistoryPage",
    components: {
      VehicleType,
      MapComponent,
      Location,
      Order
    }
  }
</script>

<style scoped>

</style>
