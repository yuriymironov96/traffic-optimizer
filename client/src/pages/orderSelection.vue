<template>
    <v-slide-x-transition>
        <v-layout row wrap justify-space-between>
            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onBack">
                    Back to main menu
                </v-btn>
            </v-flex>
            <v-flex sm6/>
            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onNext" :disabled="!enableNext">
                    Next
                </v-btn>
            </v-flex>
            <v-flex xs2 />
            <v-flex xs8 mt-5>
                <v-card class="pa-3">
                    <v-card-title >
                        <div class="text-xs-left">
                            <h1 class="display-1 text-xs-center">Enter order info </h1>
                            <p class="mb-0 grey--text">Fields marked with * are required</p>
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
        </v-layout>
    </v-slide-x-transition>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        mounted() {
            if (this.order) {
                this.name = this.order.name;
                this.number = this.order.number;
                this.weight = this.order.weight;
            }
        },
        data() {
          return {
              name: '',
              number: '',
              weight: ''
          }
        },
        computed: {
            ...mapGetters(['order']),
            enableNext(){
                return this.name && this.number && this.weight;
            }
        },
        methods: {
            ...mapMutations(['setOrder']),
            setCurrentVehicle(vehicle){
                this.setVehicle(vehicle);
            },
            onBack() {
                this.$router.push('/')
            },
            onNext() {
                this.setOrder({
                    name: this.name,
                    number: this.number,
                    weight: this.weight
                });
                this.$router.push('/startLocation');
            },
        }
    }
</script>

<style scoped>


</style>