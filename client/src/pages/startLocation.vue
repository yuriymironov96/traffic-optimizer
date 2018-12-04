<template>
    <v-slide-x-transition>
        <v-layout mt-5 row wrap justify-space-between>
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

            <v-flex xs12 mb-5>
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
        computed: {
            ...mapGetters(['startLocation'])
        },
        methods: {
            ...mapMutations(['setStartLocation']),
            setLocation(location){
                this.setStartLocation(location);
            },
            onBack() {
                this.$router.push('/')
            },
            onNext() {
                this.$router.push('/endLocation')
            }
        }

    }
</script>

<style scoped>

</style>