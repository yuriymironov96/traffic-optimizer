import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    state    : {
      startLocation: null,
      endLocation  : null,
      vehicle      : null,
      order        : null,
      locations    : [],
      vehicles     : [],
      orders       : []
    },
    getters  : {
      startLocation: (state) => state.startLocation,
      endLocation  : (state) => state.endLocation,
      vehicle      : (state) => state.vehicle,
      order        : (state) => state.order,
      locations    : (state) => state.locations,
      vehicles     : (state) => state.vehicles,
      orders     : (state) => state.orders
    },
    mutations: {
      setLocations(state, locations) {
        state.locations = locations;
      },
      setVehicles(state, vehicles) {
        state.vehicles = vehicles;
      },
      setOrders(state, orders) {
        state.orders = orders;
      },
      setStartLocation(state, location) {
        state.startLocation = location;
      },
      setEndLocation(state, location) {
        state.endLocation = location;
      },
      setVehicle(state, vehicle) {
        state.vehicle = vehicle;
      },
      setOrder(state, order) {
        state.order = order;
      },
      clearStore(state) {
        state.startLocation = null;
        state.endLocation   = null;
        state.vehicle       = null;
        state.order         = null;
      }
    }
  })
