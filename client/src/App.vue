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

    .container
      margin-top 80px
</style>
