<template>
    <v-layout row wrap>
        <v-flex xs12 mt-4>
            <v-progress-circular
                    v-if="loadingOrders"
                    :size="70"
                    :width="7"
                    indeterminate
            />
            <OrdersTable v-if="!loadingOrders" :orders="orders" :selectOrder="selectOrder" />
        </v-flex>
        <MapComponent />
        <v-flex xs12 my-4 v-if="!!currentOrder">
            <v-progress-circular
                    v-if="loadingReport"
                    :size="70"
                    :width="7"
                    indeterminate
            />
            <Report v-else :from="from" :loading="loadingReport" :order="currentOrder" :to="to" :vehicle="vehicle"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import MapComponent from "../components/MapComponent.vue";
    import Report from "../components/Report.vue";
    import OrdersTable from "../components/OrdersTable.vue";
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        components: {Report, OrdersTable, MapComponent},
        mounted() {
            this.$instance.get('orders/parcels/')
                .then((response) => {
                    this.orders = response.data.results;
                })
                .catch(function (error) {
                    this.showError(error);
                });
            this.$instance.get('vehicles/vehicles/')
                .then((response) => {
                    this.vehicle = response.data.results[0];
                })
                .catch(function (error) {
                    this.showError(error);
                });
            this.$instance.get('locations/locations/')
                .then((response) => {
                    this.from = response.data.results[0];
                    this.to = response.data.results[1];
                });
            setTimeout(() => {
                this.loadingOrders = false;
                if (this.orderId) {
                    this.selectOrder({
                        item: {
                            id: this.orderId
                        }
                    })
                }
            }, 1000);
        },
        data() {
            return {
                orders: null,
                currentOrder: null,
                vehicle: null,
                from: null,
                to: null,
                loadingOrders: true,
                loadingReport: false
            }
        },
        computed: {
            ...mapGetters(['orderId']),
        },
        methods: {
            ...mapMutations(['setOrderId']),
            selectOrder(order) {
                this.currentOrder = this.orders.find((o) => o.id === order.item.id);
                this.setOrderId(this.currentOrder.id);
                setTimeout(() => this.loadingReport = false, 1000);
            }
        }
    }
</script>
