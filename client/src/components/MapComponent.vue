<template>
    <v-container mt-5>
        <v-flex xs10 mt-5>
            <h1 class="display-2">Map</h1>
        </v-flex>
        <v-flex xs10 mt-5>
            <div id="map"></div>
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

        google.maps.event.addListener(map, 'click', function(event) {
            addMarker(event.latLng, map);
        });

        function addMarker(location, map) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });

            google.maps.event.addListener(marker, 'click', function(event) {
                this.setMap(null);
            });
        }
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
        var stepDisplay = new google.maps.InfoWindow;

        calculateAndDisplayRoute(
            directionsDisplay, directionsService, [], stepDisplay, map);

        function calculateAndDisplayRoute(directionsDisplay, directionsService,
          markerArray, stepDisplay, map) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
          origin: { lat: 50.405892, lng: 30.340400 },
          destination: { lat: 50.510206, lng: 30.498976 },
          travelMode: 'DRIVING'
        }, function(response, status) {
          // Route the directions and pass the response to a function to create
          // markers for each step.
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            //showSteps(response, markerArray, stepDisplay, map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      function showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
          var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
          marker.setMap(map);
          marker.setPosition(myRoute.steps[i].start_location);
        }
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
