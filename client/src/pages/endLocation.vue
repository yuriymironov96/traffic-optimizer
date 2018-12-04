<template>
    <v-slide-x-transition>
        <v-layout mt-5 row wrap justify-space-between>
            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onBack">
                    Back
                </v-btn>
            </v-flex>

            <v-flex xs12 sm3>
                <v-btn block color="secondary" @click="onNext" :disabled="!endLocation">
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
        name: "endLocation",
        beforeMount() {
            if (!this.startLocation) {
                this.$router.push('/');
            }
        },
        components: {Location},
        computed: {
            ...mapGetters(['startLocation', 'endLocation'])
        },
        methods: {
            ...mapMutations(['setEndLocation']),
            setLocation(location){
                this.setEndLocation(location);
            },
            onBack() {
                this.$router.push('/startLocation')
            },
            onNext() {
                this.$router.push('/vehicle')
            }
        }
    }
</script>

<style scoped>

</style>