<template>
  <v-layout row wrap>
    <v-flex xs12 mt-4>
      <OrdersTable :orders="orders" :selectOrder="selectOrder"/>
    </v-flex>

    <v-flex xs12 my-4 v-if="!!order">
      <v-progress-circular
          v-if="loadingReport"
          :size="70"
          :width="7"
          indeterminate
      />
      <Report v-else :loading="loadingReport"/>
    </v-flex>
  </v-layout>
</template>

<script>
  import Report from "../components/Report.vue";
  import OrdersTable from "../components/OrdersTable.vue";
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    components: {Report, OrdersTable},
    mounted() {
      if (!this.vehicle) {
        this.setVehicle(this.vehicles[0]);
      }
    },
    data() {
      return {
        loadingReport: false
      }
    },
    computed  : {
      ...mapGetters(['orderId', 'orders', 'order', 'vehicle', 'vehicles'])
    },
    methods   : {
      ...mapMutations(['setOrder', 'setVehicle']),
      selectOrder(order) {
        this.loadingReport = true;
        const currentOrder = this.orders.find((o) => o.id === order.id);
        this.setOrder(currentOrder);
        setTimeout(() => this.loadingReport = false, 700);
      }
    }
  }
</script>
