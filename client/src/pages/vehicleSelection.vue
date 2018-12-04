<template>
    <v-slide-x-transition>
        <v-layout row wrap justify-space-between>
            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onBack">
                    Back
                </v-btn>
            </v-flex>

            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onNext" :disabled="!vehicle">
                    Generate Report
                </v-btn>
            </v-flex>

            <v-flex xs12 mb-5 mt-4>
                <VehicleType :onVehicleSelection="setCurrentVehicle"/>
            </v-flex>
            <v-snackbar
                    style="whiteSpace: pre-line"
                    v-model="snackbar"
                    :color="color"
                    multi-line
                    :timeout="timeout"
            >
                <p> {{ errorText }} </p>
                <v-btn
                        dark
                        flat
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </v-layout>
    </v-slide-x-transition>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import VehicleType from '../components/VehicleType.vue'

    export default {
        beforeMount() {
            if (!this.startLocation || !this.endLocation || !this.order) {
                this.$router.push('/');
            }
        },
        data() {
            return {
                errorText: '',
                snackbar: false,
                timeout: 0,
                color: '#C12828'
            }
        },
        components: {VehicleType},
        computed: {
            ...mapGetters(['order', 'startLocation', 'endLocation', 'vehicle'])
        },
        methods: {
            ...mapMutations(['setVehicle', 'clearStore', 'setOrderId']),
            setCurrentVehicle(vehicle) {
                this.setVehicle(vehicle);
            },
            onBack() {
                this.$router.push('/endLocation');
            },
            onNext() {
                this.$instance.post('orders/parcels/', {
                    "customer_phone": this.order.number,
                    "customer_name": this.order.name,
                    "weight": this.order.weight,
                    "departure_point": this.startLocation.id,
                    "delivery_point": this.endLocation.id,
                }).then((response) => {
                    this.clearStore();
                    this.setOrderId(response.data.id);
                    this.$router.push('/orderPage');
                }).catch((error) => {
                    this.showError(error);
                });
            },
            showError(error) {
                this.errorText = '';
                let errorMessage = '';

                for (let item in error.response.data)
                    for (let message of error.response.data[item])
                        errorMessage += `${item}: ${message} \n`;

                this.errorText = errorMessage;
                this.snackbar = true;
            }
        }
    }
</script>
