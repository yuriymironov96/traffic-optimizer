<template>
  <v-container mt-5>
    <v-layout row wrap>
      <v-flex xs10 mt-5>
        <h1 class="display-2">Vehicle Type</h1>
      </v-flex>
      <v-flex xs2 mt-5>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2">Add vehicle
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.model"
                                  label="Model"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.brand"
                                  label="Brand"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.capacity"
                                  label="Capacity"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.fuel_capacity"
                                  label="Fuel Capacity"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.fuel_consumption"
                                  label="Fuel Consumption"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel
              </v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Save
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
            <td class="text-xs-left">{{ props.item.model }}</td>
            <td class="text-xs-center">{{ props.item.brand }}</td>
            <td class="text-xs-center">{{ props.item.capacity }}</td>
            <td class="text-xs-center">{{ props.item.fuel_capacity }}</td>
            <td class="text-xs-center">{{ props.item.fuel_consumption }}</td>
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
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="fas fa-exclamation-triangle">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        search: '',
        headers : [
          {
            text    : 'Model',
            align   : 'left',
            sortable: true,
            value   : 'model'
          },
          {text: 'Brand', value: 'brand', align: 'center'},
          {text: 'Capacity, t', value: 'capacity', align: 'center'},
          {text: 'Fuel Capacity, L', value: 'fuel_capacity', align: 'center'},
          {text: 'Fuel Consumption, L/100 km', value: 'fuel_consumption', align: 'center'},
          {text: 'Actions', value: 'name', sortable: false}
        ],
        editedIndex: -1,
        editedItem: {
          model    : '',
          brand: '',
          capacity     : 0,
          fuel_capacity   : 0,
          fuel_consumption : 0
        },
        defaultItem: {
          model    : '',
          brand: '',
          capacity     : 0,
          fuel_capacity   : 0,
          fuel_consumption : 0
        },
        vehicles: [
          {
            value   : false,
            model    : 'Frozen Yogurt',
            brand: 159,
            capacity     : 6.0,
            fuel_capacity   : 24,
            fuel_consumption : 4.0
          },
          {
            value   : false,
            model    : 'Ice cream sandwich',
            brand: 237,
            capacity     : 9.0,
            fuel_capacity   : 37,
            fuel_consumption : 4.3
          },
          {
            value   : false,
            model    : 'Eclair',
            brand: 262,
            capacity     : 16.0,
            fuel_capacity   : 23,
            fuel_consumption : 6.0
          },
          {
            value   : false,
            model    : 'Cupcake',
            brand: 305,
            capacity     : 3.7,
            fuel_capacity   : 67,
            fuel_consumption : 4.3
          },
          {
            value   : false,
            model    : 'Gingerbread',
            brand: 356,
            capacity     : 16.0,
            fuel_capacity   : 49,
            fuel_consumption : 3.9
          },
          {
            value   : false,
            model    : 'Jelly bean',
            brand: 375,
            capacity     : 0.0,
            fuel_capacity   : 94,
            fuel_consumption : 0.0
          },
          {
            value   : false,
            model    : 'Lollipop',
            brand: 392,
            capacity     : 0.2,
            fuel_capacity   : 98,
            fuel_consumption : 0
          },
          {
            value   : false,
            model    : 'Honeycomb',
            brand: 408,
            capacity     : 3.2,
            fuel_capacity   : 87,
            fuel_consumption : 6.5
          },
          {
            value   : false,
            model    : 'Donut',
            brand: 452,
            capacity     : 25.0,
            fuel_capacity   : 51,
            fuel_consumption : 4.9
          },
          {
            value   : false,
            model    : 'KitKat',
            brand: 518,
            capacity     : 26.0,
            fuel_capacity   : 65,
            fuel_consumption : 7
          }
        ]
      }
    },

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    
    methods: {
      editItem(item) {
        this.editedIndex = this.vehicles.indexOf(item)
        this.editedItem  = Object.assign({}, item)
        this.dialog      = true
      },
  
      deleteItem(item) {
        const index = this.vehicles.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.vehicles.splice(
          index,
          1
        )
      },
  
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
  
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.vehicles[this.editedIndex], this.editedItem)
        } else {
          this.vehicles.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
