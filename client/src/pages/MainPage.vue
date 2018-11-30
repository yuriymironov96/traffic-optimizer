<template>
  <v-layout mt-5>
    <v-flex xs5>
      <v-btn block color="secondary" @click="createRequest">
        Create new transportation request
      </v-btn>
    </v-flex>
    <v-flex xs5 offset-xs2>
      <v-btn block color="secondary" @click="viewHistory">
        View History
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "MainPage",
    methods: {
      createRequest() {
        this.$router.push({name: 'newOrderPage'})
      },
      viewHistory() {
        this.$router.push({name: 'historyPage'})
      }
    }
  }
</script>

<style scoped lang="stylus">
  .v-btn
    height 70px
    font-size 20px

</style>
