<template>
  <v-layout row wrap>
    <v-flex xs2>
      <v-btn v-if="showBackBtn" block color="secondary"
             @click="() => this.$router.go(-1)">
        Back
      </v-btn>
    </v-flex>
    <v-flex xs8>
      <h1 class="display-2">{{getTitle}}</h1>
    </v-flex>
    <v-flex xs2>
      <v-dialog v-model="dialog" max-width="700px">
        <v-btn slot="activator" block color="primary" dark
               class="mb-2">Add new location
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
              <v-layout wrap >
                <v-flex xs12 class="location">
                  <MapComponent :onMarkerCreated="onMarkerCreated" />
                </v-flex>
                <v-flex xs12 sm6 px-2>
                  <v-text-field v-model="editedItem.name"
                                label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 px-2>
                  <v-text-field v-model="editedItem.address"
                                label="Address"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 px-2>
                  <v-text-field v-model="editedItem.longitude"
                                label="Longitude" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 px-2>
                  <v-text-field v-model="editedItem.latitude"
                                label="Latitude" readonly></v-text-field>
                </v-flex>
              </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel
            </v-btn>
            <v-btn color="blue darken-1" flat @click.native="save" :disabled="!saveEnabled">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-flex xs12 mt-5>
      <v-text-field
          v-model="search"
          append-icon="fas fa-search"
          label="Search"
          single-line
          hide-details
      />
    </v-flex>
    <v-flex xs12 mt-5>
      <v-data-table
          :headers="headers"
          :items="getLocations"
          class="elevation-1"
          :search="search"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
            <span>
            {{ props.header.text }}
          </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <tr @click="onItemSelection(props.item)"
              :class="{selectedRow: props.item.id === getSelectedItemId}">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.address }}</td>
            <td class="text-xs-center">{{
              parseFloat(props.item.longitude).toFixed(2) }}
            </td>
            <td class="text-xs-center">{{
              parseFloat(props.item.latitude).toFixed(2) }}
            </td>
            <td class="justify-center layout px-0">
              <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item)"
              >
                fas fa-edit
              </v-icon>
              <v-icon
                  small
                  @click="deleteItem(props.item)"
              >
                fas fa-trash
              </v-icon>
            </td>
          </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error"
                 icon="fas fa-exclamation-triangle">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-flex>
    <v-snackbar
        style="whiteSpace: pre-line"
        v-model="snackbar"
        :color="color"
        multi-line
        :timeout="timeout"
    >
      <p> {{ errorText }} </p>
      <v-btn
          dark
          flat
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import MapComponent from "./MapComponent.vue";

  export default {
    props   : ['onLocationSelection'],
    components: {MapComponent},
    data() {
      return {
        api        : 'locations/locations/',
        snackbar   : false,
        color      : '#C12828',
        timeout    : 5000,
        errorText  : '',
        dialog     : false,
        search     : '',
        headers    : [
          {
            text    : 'Name',
            align   : 'left',
            sortable: true,
            value   : 'name'
          },
          {text: 'Address', value: 'address', align: 'center'},
          {text: 'Longitude', value: 'longitude', align: 'center'},
          {text: 'Latitude', value: 'latitude', align: 'center'},
          {text: 'Actions', value: 'name', sortable: false}
        ],
        editedIndex: -1,
        editedItem : {
          name     : '',
          address  : '',
          longitude: 0,
          latitude : 0
        },
        defaultItem: {
          name     : ' ',
          address  : ' ',
          longitude: 0,
          latitude : 0
        }/*,
      locations  : [
        {
          value    : false,
          name     : 'Kyiv',
          address  : 'Kyiv',
          longitude: -84.74,
          latitude : 76.55
        },
        {
          value    : false,
          name     : 'Odys',
          address  : 'Sey',
          longitude: 33.42,
          latitude : 105.55
        }, {
          value    : false,
          name     : 'Street',
          address  : 'Teerts',
          longitude: 26.43,
          latitude : -50.02
        }, {
          value    : false,
          name     : 'Loc',
          address  : 'ation',
          longitude: 52.34,
          latitude : 21.55
        }, {
          value    : false,
          name     : 'TooMuchKyiv',
          address  : 'Kyiv',
          longitude: -62.24,
          latitude : -9.67
        }, {
          value    : false,
          name     : 'Dark',
          address  : 'Side',
          longitude: 52.34,
          latitude : 21.55
        }, {
          value    : false,
          name     : 'The',
          address  : 'Moon',
          longitude: 38.16,
          latitude : 20.75
        },
        {
          value    : false,
          name     : 'Center',
          address  : 'Middle',
          longitude: 96.68,
          latitude : -21.55
        }, {
          value    : false,
          name     : 'Some name',
          address  : 'address',
          longitude: 49.63,
          latitude : 74.25
        }
      ]*/
      }
    },
    computed: {
      ...mapGetters(['startLocation', 'endLocation', 'locations']),
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      showBackBtn() {
        return this.$route.name === 'historyPage';
      },
      getSelectedItemId() {
        if (this.$route.name.includes('start')) {
          return this.startLocation && this.startLocation.id;
        }
        if (this.$route.name.includes('end')) {
          return this.endLocation && this.endLocation.id;
        }
      },
      getTitle() {
        if (this.$route.name.includes('start')) {
          return 'Select start location';
        }
        if (this.$route.name.includes('end')) {
          return 'Select existing location';
        }
        return 'Locations';
      },
      getLocations() {
        if (this.$route.name.includes('end')) {
          return this.locations.filter((location) => location.id !== this.startLocation.id)
        }
        return this.locations;
      },
      saveEnabled() {
        return this.editedItem.name && this.editedItem.address && this.editedItem.latitude && this.editedItem.longitude
      }
    },
    watch   : {
      dialog(val) {
        val || this.close()
      }
    },
    methods : {
      ...mapMutations(['setLocations']),
      showError(error) {
        this.errorText   = '';
        let errorMessage = '';

        for (let item in error.response.data)
          for (let message of error.response.data[item])
            errorMessage += `${item}: ${message} \n`;

        this.errorText = errorMessage;
        this.snackbar  = true;
      },

      editItem(item) {
        this.editedIndex = this.locations.indexOf(item)
        this.editedItem  = Object.assign({}, item)
        this.dialog      = true
      },

      deleteItem(item) {
        const index = this.locations.indexOf(item)
        if (confirm('Are you sure you want to delete this item?')) {
          this.locations.splice(index, 1);
          this.$instance.delete(`${this.api}${item.id}`);
        }
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem  = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          // Edition
          var newItem      = this.editedItem;
          var newItemIndex = this.editedIndex;
          this.$instance.patch(`${this.api}${this.editedItem.id}/`, {
            "name"     : this.editedItem.name,
            "address"  : this.editedItem.address,
            "longitude": this.editedItem.longitude,
            "latitude" : this.editedItem.latitude
          })
            .then((response) => {
              this.$instance.get(this.api)
                .then((response) => {
                    this.setLocations(response.data.results);
                })
                .catch(function (error) {
                  console.error("Unable to get locations" + error);
                });
            })
            .catch((error) => {
              this.showError(error);
            });
        } else {
          // Addition
          var newItem = this.editedItem;
          this.$instance.post(this.api, {
            "name"     : this.editedItem.name,
            "address"  : this.editedItem.address,
            "longitude": this.editedItem.longitude,
            "latitude" : this.editedItem.latitude
          })
            .then((response) => {
              this.$instance.get(this.api)
                .then((response) => {
                  this.setLocations(response.data.results);
                })
                .catch(function (error) {
                  console.error("Unable to get locations" + error);
                });
            })
            .catch((error) => {
              this.showError(error);
            });
        }
        this.close()
      },
      onItemSelection(item) {
        this.onLocationSelection && this.onLocationSelection(item);
      },
      onMarkerCreated(marker) {
        if (marker) {
          this.editedItem.longitude = parseFloat(marker.lng()).toFixed(5);
          this.editedItem.latitude  =
          parseFloat(marker.lat()).toFixed(5);
        }
      }
    },
  }
</script>

<style>
  .selectedRow {
    background : lightblue;
  }

  .location>#map {
    height : 300px;
  }
</style>
