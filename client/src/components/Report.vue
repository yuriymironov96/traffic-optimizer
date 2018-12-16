<template>
    <v-slide-x-transition>

        <v-card >
            <!-- <v-img
                    src="https://cnet2.cbsistatic.com/img/H_zPLL8-QTZOLxJvgHQ1Jkz0EgY=/830x467/2013/07/10/f0bcef02-67c2-11e3-a665-14feb5ca9861/maps_routemap.png"
                    height="200px"
            >
            </v-img> -->
            <v-card-title primary-title>
                <div class="text-xs-left">
                    <div class="headline"><span class="font-weight-bold">Customer: </span>{{order.customer_name}}</div>
                    <p class="mb-0 grey--text">Phone: {{order.customer_phone}}</p>
                    <p class="mb-0 grey--text">Date: 20-10-18</p>
                </div>
            </v-card-title>
            <v-card-text class="text-xs-left">
                <p><span class="font-weight-bold">From: </span> {{`${from.name} ${from.address}`}}</p>
                <p><span class="font-weight-bold">To: </span> {{`${to.name} ${to.address}`}}</p>
                <p><span class="font-weight-bold">Weight: </span> {{order.weight}}</p>
                <p><span class="font-weight-bold">Transport: </span> {{`${vehicle.model} ${vehicle.vendor}`}}</p>
                <p><span class="font-weight-bold">Status: </span> Finished</p>

            </v-card-text>
        </v-card>
    </v-slide-x-transition>
</template>
<script>
    export default {
        name: 'Report',
        props: {
            from: {},
            loadingReport: {},
            order: {},
            to: {},
            vehicle: {}
        }
    }
</script>
