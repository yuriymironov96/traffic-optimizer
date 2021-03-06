<template>
  <div>
    <v-layout row wrap>
      <v-flex xs2/>
      <v-flex xs8>
        <h1 class="display-2">Order</h1>
      </v-flex>
      <v-flex xs2>
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
            <td class="text-xs-left">{{ props.item.customer_name }}</td>
            <td class="text-xs-center">{{ props.item.customer_phone }}</td>
            <td class="text-xs-center">{{ props.item.weight }}</td>
            <td class="text-xs-center">{{ props.item.departure_point_name }}</td>
            <td class="text-xs-center">{{ props.item.delivery_point_name }}</td>
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
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        api        : 'orders/parcels/',
        snackbar   : false,
        color      : '#C12828',
        timeout    : 5000,
        errorText  : '',
        dialog     : false,
        search     : '',
        headers    : [
          {
            text    : 'Customer`s name',
            align   : 'left',
            sortable: true,
            value   : 'customer_name'
          },
          {text: 'Customer`s phone', value: 'customer_phone', align: 'center'},
          {text: 'Weight, kg', value: 'weight', align: 'center'},
          {text: 'Departure point', value: 'departure_point_name', align: 'center'},
          {text: 'Delivery point', value: 'delivery_point_name', align: 'center'},
          {text: 'Actions', value: 'customer_name', sortable: false}
        ],
        editedIndex: -1,
        editedItem : {
          customer_name  : '',
          customer_phone : '',
          weight         : 0,
          departure_point_name: '',
          delivery_point_name : ''
        },
        defaultItem: {
          customer_name  : '',
          customer_phone : '',
          weight         : 0,
          departure_point_name: '',
          delivery_point_name : ''
        }
      }
    },
    computed: {
      ...mapGetters(['orders']),
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    watch   : {
      dialog(val) {
        val || this.close()
      }
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.orders.indexOf(item)
        this.editedItem  = Object.assign({}, item)
        this.dialog      = true
      },

      deleteItem(item) {
        const index = this.orders.indexOf(item);

        if (confirm('Are you sure you want to delete this item?')) {
          this.orders.splice(index, 1);
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

      showError(error) {
        this.errorText   = '';
        let errorMessage = '';

        for (let item in error.response.data)
          for (let message of error.response.data[item])
            errorMessage += `${item}: ${message} \n`;

        this.errorText = errorMessage;
        this.snackbar  = true;
      },

      save() {
        if (this.editedIndex > -1) {
          // Edition
          var newItem      = this.editedItem;
          var newItemIndex = this.editedIndex;

          this.$instance.patch(`${this.api}${this.editedItem.id}/`, {
            "customer_name"  : this.editedItem.customer_name,
            "customer_phone" : this.editedItem.customer_phone,
            "weight"         : this.editedItem.weight,
            "departure_point": this.editedItem.departure_point,
            "delivery_point" : this.editedItem.delivery_point
          })
            .then((response) => {
              Object.assign(this.orders[newItemIndex], newItem)
            })
            .catch((error) => {
              this.showError(error);
            });
        } else {
          // Addition
          var newItem = this.editedItem;

          this.$instance.post(this.api, {
            "customer_name"  : this.editedItem.customer_name,
            "customer_phone" : this.editedItem.customer_phone,
            "weight"         : this.editedItem.weight,
            "departure_point": this.editedItem.departure_point,
            "delivery_point" : this.editedItem.delivery_point
          })
            .then((response) => {
              this.orders.push(newItem);
            })
            .catch((error) => {
              this.showError(error);
            });
        }
        this.close()
      }
    }
  }
</script>

<style scoped>
</style>
