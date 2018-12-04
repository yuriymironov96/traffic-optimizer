import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        startLocation: null,
        endLocation: null,
        vehicle: null,
        orderId: null
    },
    getters: {
        startLocation: (state) => state.startLocation,
        endLocation: (state) => state.endLocation,
        vehicle: (state) => state.vehicle,
        orderId:(state) => state.orderId
    },
    mutations: {
        setStartLocation (state, location) {
            state.startLocation = location;
        },
        setEndLocation (state, location) {
            state.endLocation = location;
        },
        setVehicle (state, vehicle) {
            state.vehicle = vehicle;
        },
        setOrderId (state, orderId) {
            state.orderId = orderId;
        },
        clearStore(state) {
            state.startLocation = null;
            state.endLocation = null;
            state.vehicle = null;
        }
    }
})