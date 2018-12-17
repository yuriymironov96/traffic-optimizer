<template>
  <v-slide-x-transition>
    <v-layout row wrap mt-5>
      <v-flex xs2>
        <v-btn block color="secondary"
               @click="() => this.$router.go(-1)">
          Back
        </v-btn>
      </v-flex>
      <v-flex xs8>
        <h1 class="display-1 mb-5">Optimized transportation route</h1>
      </v-flex>
    <v-flex xs12 class="transportation">
      <MapComponent :predefined="true" class="elevation-10"/>
    </v-flex>
  </v-layout>
  </v-slide-x-transition>
</template>

<script>
  import MapComponent from "../components/MapComponent.vue";

  export default {
    components: {MapComponent},
    name: "TransportationPage",
  }
</script>

<style lang="stylus">
  .transportation > #map
    height 500px
    border 2px solid grey

</style>
