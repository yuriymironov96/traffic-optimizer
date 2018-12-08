<template>
  <v-toolbar app color="secondary">
    <v-spacer />
    <v-flex mt-3>
      <p class="display-1 font-weight-bold text-xs-right white--text" @click="goHome">Traffic Optimizer</p>
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
