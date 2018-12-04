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
                    Next
                </v-btn>
            </v-flex>

            <v-flex xs12 mb-5 mt-4>
                <VehicleType :onVehicleSelection="setCurrentVehicle" />
            </v-flex>
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
        computed: {
            ...mapGetters(['startLocation', 'endLocation', 'vehicle'])
        },
        methods: {
            ...mapMutations(['setVehicle']),
            setCurrentVehicle(vehicle){
                this.setVehicle(vehicle);
            },
            onBack() {
                this.$router.push('/')
            },
            onNext() {
                this.$router.push('/order')
            }
        }
    }
</script>

<style scoped>

</style>