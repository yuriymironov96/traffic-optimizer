<template>
  <v-slide-x-transition>
    <v-layout row wrap mt-5>
    <v-flex xs12>
      <v-btn block color="secondary" @click="createRequest">
        Create new transportation request
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn block color="secondary" @click="openRequest">
        Open transportation request
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn block color="secondary" @click="viewHistory">
        View History
      </v-btn>
    </v-flex>
  </v-layout>
  </v-slide-x-transition>
</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
    name: "MainPage",
    mounted() {
      this.setOrder(null);
    },
    methods: {
      ...mapMutations(['setOrder']),
      createRequest() {
        this.$router.push('/order');
      },
      openRequest() {
        this.$router.push({name: 'orderPage'})
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
