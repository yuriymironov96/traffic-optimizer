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
    }
}
</script>

<style scoped>
    #map {
        height: 400px;
        width: 100%;
    }
</style>
