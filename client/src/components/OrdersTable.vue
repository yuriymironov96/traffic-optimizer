<template>
    <v-layout row wrap>
        <v-flex xs3>
            <v-btn class="py-2 backBtn" block color="secondary" @click="() => this.$router.push('/')">
                Back to main menu
            </v-btn>
        </v-flex>
        <v-flex xs7>
            <h1 class="display-1 mb-5">Select order to generate report</h1>
        </v-flex>
        <v-flex xs2/>
        <v-flex xs12>
            <v-data-table
                    :headers="headers"
                    :items="orders"
                    class="elevation-1"
            >
                <template slot="headerCell" slot-scope="props">
                    <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
                        <span>
              {{ props.header.text }}
            </span>
                    </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                    <tr
                            @click="selectOrder(props.item)"
                            :key="props.item.id"
                            :class="{selectedRow: props.item.id === getOrderId}"
                    >
                        <td class="text-xs-left">{{ props.item.customer_name }}</td>
                        <td class="text-xs-center">{{ props.item.customer_phone }}</td>
                        <td class="text-xs-center">{{ props.item.weight }}</td>
                        <td class="text-xs-center">{{ props.item.departure_point_name }}</td>
                        <td class="text-xs-center">{{ props.item.delivery_point_name }}</td>
                    </tr>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="fas fa-exclamation-triangle">
                    No data available
                </v-alert>
            </v-data-table>
        </v-flex>
    </v-layout>

</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'OrdersTable',
        props: [
            'selectOrder'
        ],
        data() {
            return {
                headers: [
                    {
                        text: 'Customer`s name',
                        align: 'left',
                        sortable: true,
                        value: 'customer_name'
                    },
                    {text: 'Customer`s phone', value: 'customer_phone', align: 'center'},
                    {text: 'Weight, kg', value: 'weight', align: 'center'},
                    {text: 'Departure point', value: 'departure_point_name', align: 'center'},
                    {text: 'Delivery point', value: 'delivery_point_name', align: 'center'}
                ]
            }
        },
        computed: {
            ...mapGetters(['order', 'orders']),
          getOrderId() {
              return this.order ? this.order.id : -1;
          }
        }
    }
</script>

<style scoped>
    .backBtn {
        text-wrap: normal;
    }

</style>
