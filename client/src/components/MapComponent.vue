<template>
  <div id="map"></div>
  <!-- <v-btn block color="secondary" @click="calculateRoute" :disabled="calculationOn == 0">
    Calculate
  </v-btn> -->
</template>

<script>
  export default {
    props  : ['locations', 'predefined', 'onMarkerCreated'],
    mounted: function () {
      let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.45466, lng: 30.5238},
        zoom  : 11
      });

      if (this.predefined) {
        if (this.locations) {
          if (this.locations[0]) {
            this.markersArray.start = this.getCoordinatesFromLocation(this.locations[0]);
            // const startCoordinates  = this.getCoordinatesFromLocation(this.locations[0]);
            // this.markersArray.start = this.addMarker(
            //   startCoordinates,
            //   map,
            //   "Start"
            // );
          }
          if (this.locations[1]) {
            this.markersArray.end = this.getCoordinatesFromLocation(this.locations[1]);
            // const endCoordinates  = this.getCoordinatesFromLocation(this.locations[1]);
            // this.markersArray.end = this.addMarker(
            //   endCoordinates,
            //   map,
            //   "End"
            // );
          }
          this.activateCalculation();

          this.map = map;
          this.calculateAndDisplayRoute();
        } else {
          this.map = map;
          this.calculateAndDisplayMultipleRoute();
        }
      } else {
        google.maps.event.addListener(map, 'click', (event) => {
          this.currertMarker && this.currertMarker.setMap(null);
          this.currertMarker = new google.maps.Marker(
            {
              position : event.latLng,
              map      : map,
              animation: google.maps.Animation.DROP
            });
          google.maps.event.addListener(
            this.currertMarker,
            'click',
            function () {
              // Open an info window when the marker is clicked on, containing the text
              // of the step.
              let stepDisplay = new google.maps.InfoWindow;
              stepDisplay.setContent("Deliver here");
              stepDisplay.open(
                map,
                this.currertMarker
              );
            }
          );
          this.onMarkerCreated(event.latLng);
        });
      }
    },
    data() {
      return {
        map          : null,
        markersArray : {
          start: null,
          end  : null
        },
        calculationOn: false,
        recalculation: false,
        currertMarker: null,
        routes       : null
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
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
        let stepDisplay       = new google.maps.InfoWindow;

        calculateAndDisplayRoute(
          directionsDisplay,
          directionsService,
          this.markersArray,
          stepDisplay,
          response.data.route.waypoints,
          map
        );

        this.$instance.get('routes/routes/')
          .then((response) => {
            this.markersArray.start = response.data.route.origin;
            this.markersArray.end   = response.data.route.destination;
            calculateAndDisplayRoute(
              directionsDisplay,
              directionsService,
              this.markersArray,
              stepDisplay,
              response.data.route.waypoints,
              map
            );
          })
          .catch(function (error) {
            console.log(error);
          });

        function calculateAndDisplayRoute(
          directionsDisplay,
          directionsService,
          markerArray,
          stepDisplay,
          waypoints,
          map
        ) {

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
                                    origin           : {
                                      lat: markerArray.start.lat,
                                      lng: markerArray.start.lng
                                    },
                                    destination      : {
                                      lat: markerArray.end.lat,
                                      lng: markerArray.end.lng
                                    },
                                    waypoints        : waypts,
                                    optimizeWaypoints: true,
                                    travelMode       : 'DRIVING'
                                  }, function (response, status) {
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
          google.maps.event.addListener(
            response.request.destination,
            'click',
            function () {
              stepDisplay.setContent("End point");
              stepDisplay.open(map, marker);
            }
          );
        }

        this.calculationOn = false;
      },

      getCoordinatesFromLocation(location) {
        // return new google.maps.LatLng({lat: location.latitude, lng: location.longitude});
        return {
          lat: Number.parseFloat(location.latitude),
          lng: Number.parseFloat(location.longitude)
        }
      },
      calculateAndDisplayMultipleRoute() {
        this.$instance.get('routes/routes/')
          .then(
            (response) => {
              const routes          = response.data.route;
              let directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
              let directionsService = new google.maps.DirectionsService;

              let waypoints = routes.waypoints.map(wpt => ({
                location: {
                  lat: wpt.lat,
                  lng: wpt.lng
                },
                stopover: true
              }));

              directionsService.route(
                {
                  origin           : routes.origin,
                  destination      : routes.destination,
                  waypoints        : waypoints,
                  optimizeWaypoints: true,
                  travelMode       : 'DRIVING'
                }, function (response, status) {
                  if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                  } else {
                    window.alert('Directions request failed due to ' + status);
                  }
                });
            });
      },
      calculateAndDisplayRoute(route) {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
        // let stepDisplay       = new google.maps.InfoWindow;

        directionsService.route({
                                  origin           : {
                                    lat: this.markersArray.start.lat,
                                    lng: this.markersArray.start.lng
                                  },
                                  destination      : {
                                    lat: this.markersArray.end.lat,
                                    lng: this.markersArray.end.lng
                                  },
                                  // origin        : {
                                  //   lat : 50.440638,
                                  //   lng: 30.429656
                                  // },
                                  // destination          : {
                                  //   lat : 50.450940,
                                  //   lng: 30.466568
                                  // },
                                  optimizeWaypoints: true,
                                  travelMode       : 'DRIVING'
                                }, function (response, status) {
          if (status === 'OK') {
            //debugger;
            //console.log(response.request.origin.location.lat());
            //console.log(response.request.destination.location.lat());
            directionsDisplay.setDirections(response);
            // this.showSteps(response, stepDisplay);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
        this.calculationOn = false;
      }
    }
  }
</script>

<style scoped>
  #map {
    height : 200px;
    width  : 100%;
  }
</style>
