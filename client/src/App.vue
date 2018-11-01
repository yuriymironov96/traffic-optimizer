<template>
  <v-app class="qa-app">
    <v-container
        fluid
        pa-0
    >
      <Header/>
      <MapComponent/>
    </v-container>
  </v-app>
</template>

<script>
  import Header from './components/Header.vue'
  import VehicleType from './components/VehicleType.vue'
  import MapComponent from './components/MapComponent.vue'

  export default {
    components: {
      Header,
      VehicleType,
      MapComponent
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
</style>
