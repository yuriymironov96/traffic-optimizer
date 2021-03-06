<template>
  <div>
    <v-layout row wrap>
      <v-flex xs2/>
      <v-flex xs8>
        <h1 class="display-2">{{getTitle}}</h1>
      </v-flex>
      <v-flex xs2>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" block color="primary" dark class="mb-2">Add
            vehicle
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-layout wrap>
                  <v-flex xs12 sm6 px-2>
                    <v-text-field v-model="editedItem.model"
                                  label="Model"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 px-2>
                    <v-text-field v-model="editedItem.vendor"
                                  label="Vendor"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 px-2>
                    <v-text-field v-model="editedItem.max_load"
                                  label="Max capacity"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 px-2>
                    <v-text-field v-model="editedItem.fuel_capacity"
                                  label="Fuel Capacity"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 px-2>
                    <v-text-field v-model="editedItem.fuel_consumption"
                                  label="Fuel Consumption"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 px-2>
                    <v-text-field v-model="editedItem.license_plate_number"
                                  label="Plate number"></v-text-field>
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
      <v-flex xs12>
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
            :items="vehicles"
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
              <td class="text-xs-left">{{ props.item.model }}</td>
              <td class="text-xs-center">{{ props.item.vendor }}</td>
              <td class="text-xs-center">{{
                parseFloat(props.item.max_load).toFixed(2) }}
              </td>
              <td class="text-xs-center">{{ props.item.license_plate_number }}
              </td>
              <td class="text-xs-center">{{
                parseFloat(props.item.fuel_capacity).toFixed(2) }}
              </td>
              <td class="text-xs-center">{{
                parseFloat(props.item.fuel_consumption).toFixed(2) }}
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
    </v-layout>
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
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    props   : ['onVehicleSelection'],
    data() {
      return {
        api        : 'vehicles/vehicles/',
        snackbar   : false,
        color      : '#C12828',
        timeout    : 5000,
        errorText  : '',
        dialog     : false,
        search     : '',
        headers    : [
          {
            text    : 'Model',
            align   : 'left',
            sortable: true,
            value   : 'model'
          },
          {text: 'Vendor', value: 'vendor', align: 'center'},
          {text: 'Max load', value: 'max_load', align: 'center'},
          {
            text : 'Plate number',
            value: 'license_plate_number',
            align: 'center'
          },
          {text: 'Fuel Capacity', value: 'fuel_capacity', align: 'center'},
          {
            text : 'Fuel Consumption',
            value: 'fuel_consumption',
            align: 'center'
          },
          {text: 'Actions', value: 'model', sortable: false}
        ],
        editedIndex: -1,
        editedItem : {
          model               : '',
          vendor              : '',
          max_load            : 0,
          fuel_capacity       : 0,
          fuel_consumption    : 0,
          license_plate_number: ''
        },
        defaultItem: {
          model               : '',
          vendor              : '',
          max_load            : 0,
          fuel_capacity       : 0,
          fuel_consumption    : 0,
          license_plate_number: ''
        }
      }
    },
    computed: {
      ...mapGetters(['vehicle', 'vehicles']),
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      getSelectedItemId() {
        if (this.$route.name.includes('vehicle')) {
          return this.vehicle && this.vehicle.id;
        }
        if (this.$route.name.includes('end')) {
          return this.endLocation && this.endLocation.id;
        }
      },
      getTitle() {
        if (this.$route.name.includes('vehicle')) {
          return 'Select vehicle type';
        }
        return 'Vehicle Type';
      },
      saveEnabled() {
        const {model, vendor, license_plate_number} = this.editedItem;
        return model
          && vendor
          && license_plate_number;
      }
    },
    watch   : {
      dialog(val) {
        val || this.close()
      }
    },
    methods : {
      ...mapMutations(['setVehicles']),
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
        this.editedIndex = this.vehicles.indexOf(item)
        this.editedItem  = Object.assign({}, item)
        this.dialog      = true
      },

      deleteItem(item) {
        const index = this.vehicles.indexOf(item)
        if (confirm('Are you sure you want to delete this item?')) {
          this.vehicles.splice(index, 1);
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
            "license_plate_number": this.editedItem.license_plate_number,
            "model"               : this.editedItem.model,
            "vendor"              : this.editedItem.vendor,
            "max_load"            : this.editedItem.max_load,
            "fuel_capacity"       : this.editedItem.fuel_capacity,
            "fuel_consumption"    : this.editedItem.fuel_consumption
          })
            .then((response) => {
              this.$instance.get(this.api)
                .then((response) => {
                  this.setVehicles(response.data.results);
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
            "license_plate_number": this.editedItem.license_plate_number,
            "model"               : this.editedItem.model,
            "vendor"              : this.editedItem.vendor,
            "max_load"            : this.editedItem.max_load,
            "fuel_capacity"       : this.editedItem.fuel_capacity,
            "fuel_consumption"    : this.editedItem.fuel_consumption
          })
            .then((response) => {
              this.$instance.get(this.api)
                .then((response) => {
                  this.setVehicles(response.data.results);
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
        this.onVehicleSelection && this.onVehicleSelection(item);
      }
    }
  }
</script>

<style scoped>
</style>
