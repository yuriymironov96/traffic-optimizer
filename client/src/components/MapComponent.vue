<template>
  <v-container mt-5>
    <v-flex xs10 mt-5>
      <div id="map"></div>
      <!-- <v-btn block color="secondary" @click="calculateRoute" :disabled="calculationOn == 0">
        Calculate
      </v-btn> -->
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

    // google.maps.event.addListener(map, 'click', (event) => {
    //
    //   if (!this.markersArray.start) {
    //     this.markersArray.start = addMarker(event.latLng, map, "Start Marker");
    //   }
    //   else if (!this.markersArray.end) {
    //     this.markersArray.end = addMarker(event.latLng, map, "End Marker");
    //   } else {
    //     this.markersArray.end.setMap(null);
    //     this.markersArray.end = addMarker(event.latLng, map, "End Marker");
    //   }
    //
    //   this.activateCalculation();
    // });

    function addMarker(location, map, context) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });

      google.maps.event.addListener(marker, 'click', function() {
      // Open an info window when the marker is clicked on, containing the text
      // of the step.
        let stepDisplay = new google.maps.InfoWindow;
        stepDisplay.setContent(context);
        stepDisplay.open(map, marker);
      });

      return marker;
    }

    this.map = map;
    this.calculateRoute();
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

      this.$instance.get('routes/routes/')
          .then((response) => {
            this.markersArray.start = response.data.route.origin;
            this.markersArray.end = response.data.route.destination;
            calculateAndDisplayRoute(
              directionsDisplay, directionsService, this.markersArray, stepDisplay, response.data.route.waypoints, map);
          })
          .catch(function(error) {
              console.log(error);
          });


      function calculateAndDisplayRoute(directionsDisplay, directionsService,
        markerArray, stepDisplay, waypoints, map) {

          let waypts = [];
          for (let item of waypoints) {
              waypts.push({
                location: {
                  lat: item.lat,
                  lng: item.lng
                },
                stopover: true
              });
          }

          directionsService.route({
            origin: {
              lat: markerArray.start.lat,
              lng: markerArray.start.lng
            },
            destination: {
              lat: markerArray.end.lat,
              lng: markerArray.end.lng
            },
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {
              //debugger;
              //console.log(response.request.origin.location.lat());
              //console.log(response.request.destination.location.lat());
              directionsDisplay.setDirections(response);
              showSteps(response, stepDisplay, map);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        }

        function showSteps(response, stepDisplay, map) {
          google.maps.event.addListener(response.request.destination, 'click', function() {
            stepDisplay.setContent("End point");
            stepDisplay.open(map, marker);
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
