<template>
    <v-slide-x-transition>
        <v-layout row wrap justify-space-between>
            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onBack">
                    Back
                </v-btn>
            </v-flex>
            <v-flex sm6/>
            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onNext" :disabled="!enableReportGeneration">
                    Generate Report
                </v-btn>
            </v-flex>
            <v-flex xs2 />
            <v-flex xs8 mt-5>
                <v-card class="pa-3">
                    <v-card-title >
                        <div class="text-xs-left">
                            <h1 class="display-1 text-xs-center">Enter order info </h1>
                            <p class="mb-0 grey--text">Fields with * are required</p>
                        </div>
                    </v-card-title>
                    <v-card-text class="py-0">
                        <v-text-field v-model="name" label="Customer Name*"></v-text-field>
                        <v-text-field v-model="number" label="Customer Number*" mask="phone"></v-text-field>
                        <v-text-field v-model="weight" label="Weight, kg*" mask="#####"></v-text-field>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs2 />
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
    import { mapGetters, mapMutations } from 'vuex';
    import VehicleType from '../components/VehicleType.vue'

    export default {
        beforeMount() {
            if (!this.startLocation || !this.endLocation) {
                this.$router.push('/');
            }
        },
        components: {VehicleType},
        data() {
          return {
              name: '',
              number: '',
              weight: '',
              errorText: '',
              snackbar: false,
              timeout: 0,
              color: '#C12828'
          }
        },
        computed: {
            ...mapGetters(['startLocation', 'endLocation', 'vehicle']),
            enableReportGeneration(){
                return this.name && this.number && this.weight;
            }
        },
        methods: {
            ...mapMutations(['setVehicle', 'setOrderId', 'clearStore']),
            setCurrentVehicle(vehicle){
                this.setVehicle(vehicle);
            },
            onBack() {
                this.$router.push('/vehicle')
            },
            onNext() {
                this.$instance.post('orders/parcels/', {
                    "customer_phone": this.number,
                    "customer_name": this.name,
                    "weight": this.weight,
                    "departure_point": this.startLocation.id,
                    "delivery_point": this.endLocation.id,
                }).then((response) => {
                    this.clearStore();
                    this.setOrderId(response.data.id);
                    this.$router.push('/orderPage');
                })
                    .catch((error) => {
                        this.showError(error);
                    });
            },
            showError(error) {
                this.errorText = '';
                let errorMessage = '';

                for(let item in error.response.data)
                    for(let message of error.response.data[item])
                        errorMessage += `${item}: ${message} \n`;

                this.errorText = errorMessage;
                this.snackbar = true;
            },
        }
    }
</script>

<style scoped>


</style>