<template>
  <v-container mt-5>
    <v-layout row wrap>
      <v-flex xs10 mt-5>
        <h1 class="display-2">Order</h1>
      </v-flex>
      <v-flex xs2 mt-5>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2">Add Order
          </v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name"
                    label="Customer Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.phone"
                    label="Customer Phone"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.weight"
                    label="Weight"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.departure"
                    label="Departure Point"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.delivery"
                    label="Delivery Point"></v-text-field>
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
        :items="orders"
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
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.phone }}</td>
          <td class="text-xs-center">{{ props.item.weight }}</td>
          <td class="text-xs-center">{{ props.item.departure }}</td>
          <td class="text-xs-center">{{ props.item.delivery }}</td>
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
  mounted() {
    this.$instance.get(this.api)
    .then(function (response) {
      if(!response.data.count) {
        this.fillData();
      }
    })
    .catch(function (error) {
      console.error("Unable to get data" + error);
    });
  },

  data() {
    return {
      api: 'orders/parcels/',
      dialog: false,
      search: '',
      headers : [
        {
          text    : 'Customer`s name',
          align   : 'left',
          sortable: true,
          value   : 'name'
        },
        {text: 'Customer`s phone', value: 'phone', align: 'center'},
        {text: 'Weight, kg', value: 'weight', align: 'center'},
        {text: 'Departure point', value: 'departure', align: 'center'},
        {text: 'Delivery point', value: 'delivery', align: 'center'},
        {text: 'Actions', value: 'name', sortable: false}
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        phone: '',
        weight: 0,
        departure: '',
        delivery: '',
      },
      defaultItem: {
        name: '',
        phone: '',
        weight: 0,
        departure: '',
        delivery: '',
      },
      orders: [
        {
          name: 'Customar',
          phone: '453534',
          weight: 90,
          departure: 'From',
          delivery: 'To',
        },
        {
          name: 'Customeer',
          phone: '5643433',
          weight: 70,
          departure: 'Here',
          delivery: 'There',
        },
        {
          name: 'Zeestumer',
          phone: '9865325',
          weight: 99,
          departure: 'Dep',
          delivery: 'Del',
        },
        {
          name: 'Amcusteer',
          phone: '7843566',
          weight: 58,
          departure: 'In',
          delivery: 'Out',
        },
        {
          name: 'Liz',
          phone: '6478942',
          weight: 62,
          departure: 'Up',
          delivery: 'Down',
        },
        {
          name: 'Lebowski',
          phone: '123456',
          weight: 94,
          departure: 'Down',
          delivery: 'There',
        },
        {
          name: 'Donny',
          phone: '8765',
          weight: 86,
          departure: 'In',
          delivery: 'Here',
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
    fillData() {
      instance.get('locations/locations/')
      .then(function (response) {
        if(response.data.count < 2) {
          console.log('Not enough locations to form an order');
          return;
        } else {
          postRequest(this.api, {
            "customer_phone": '57454354',
            "customer_name": 'Sam',
            "weight": 79,
            "departure_point": 1,
            "delivery_point": 2,
          });

          postRequest(this.api, {
            "customer_name": 'Liz',
            "customer_phone": '6478942',
            "weight": 62,
            "departure_point": 2,
            "delivery_point": 1,
          });
        }
      })
      .catch(function (error) {
        console.error("Error from locations" + error);
      });
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem  = Object.assign({}, item)
      this.dialog      = true
    },

    deleteItem(item) {
      const index = this.orders.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.orders.splice(
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
        Object.assign(this.orders[this.editedIndex], this.editedItem)
      } else {
        this.orders.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
</style>
