<template>
    <v-slide-x-transition>
        <v-layout row wrap justify-space-between>
            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onBack">
                    Back to main page
                </v-btn>
            </v-flex>

            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onNext" :disabled="!startLocation">
                    Next
                </v-btn>
            </v-flex>

            <v-flex xs12 mb-5 mt-4>
                <Location :onLocationSelection="setLocation" />
            </v-flex>
        </v-layout>
    </v-slide-x-transition>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    import Location from '../components/Location.vue'

    export default {
        name: "startLocation",
        components: {Location},
        beforeMount() {
            if (!this.order) {
                this.$router.push('/');
            }
        },
        computed: {
            ...mapGetters(['order', 'startLocation'])
        },
        methods: {
            ...mapMutations(['setStartLocation']),
            setLocation(location){
                this.setStartLocation(location);
            },
            onBack() {
                this.$router.push('/order')
            },
            onNext() {
                this.$router.push('/endLocation')
            }
        }

    }
</script>

<style scoped>

</style>