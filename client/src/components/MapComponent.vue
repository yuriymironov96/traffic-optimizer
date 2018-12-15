<template>
  <v-container mt-5>
    <v-flex xs10 mt-5>
      <h1 class="display-2">Map</h1>
    </v-flex>
    <v-flex xs10 mt-5>
      <div id="map"></div>
      <v-btn block color="secondary" @click="calculateRoute" :disabled="calculationOn == 0">
        Calculate
      </v-btn>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  mounted: function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 50.45466, lng: 30.5238},
      zoom: 11
    });

    google.maps.event.addListener(map, 'click', (event) => {

      if (!this.markersArray.start) {
        this.markersArray.start = addMarker(event.latLng, map);
      }
      else if (!this.markersArray.end) {
        this.markersArray.end = addMarker(event.latLng, map);
      } else {
        this.markersArray.end.setMap(null);
        this.markersArray.end = addMarker(event.latLng, map);
      }

      this.activateCalculation();
    });

    function addMarker(location, map) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });

      return marker;
    }

    this.map = map;
  },
  data() {
    return {
      map: null,
      markersArray: {
        start: null,
        end: null
      },
      calculationOn: false,
      recalculation: false,
    }
  },
  methods: {
    activateCalculation() {
      if (this.markersArray.start && this.markersArray.end)
        this.calculationOn = true;
      else {
        this.calculationOn = false;
      }
    },

    calculateRoute() {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
      var stepDisplay = new google.maps.InfoWindow;

      calculateAndDisplayRoute(directionsDisplay, directionsService, this.markersArray, stepDisplay, map);

      function calculateAndDisplayRoute(directionsDisplay, directionsService,
        markerArray, stepDisplay, map) {
          // First, remove any existing markers from the map.
          markerArray.start.setMap(null);
          markerArray.end.setMap(null);

          directionsService.route({
            origin: { lat: markerArray.start.getPosition().lat(),
                      lng: markerArray.start.getPosition().lng() },
            destination: {  lat: markerArray.end.getPosition().lat(),
                            lng: markerArray.end.getPosition().lng() },
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        }
        this.calculationOn = false;
      }
    }
  }
  </script>

  <style scoped>
  #map {
    height: 400px;
    width: 100%;
  }
  </style>
