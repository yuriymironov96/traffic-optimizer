<template>
  <v-toolbar app>
    <v-spacer />
    <v-flex mt-3>
      <p class="display-1 font-weight-black text-xs-right" @click="goHome">Traffic Optimizer</p>
    </v-flex>
  </v-toolbar>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      goHome() {
          this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
