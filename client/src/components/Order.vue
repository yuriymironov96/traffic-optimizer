<template>
    <div>
        <v-layout row wrap>
            <v-flex xs2 />
            <v-flex xs8>
                <h1 class="display-2">Order</h1>
            </v-flex>
            <v-flex xs2>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-btn slot="activator" block color="primary" dark class="mb-2">Add Order
                    </v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.customer_name"
                                                      label="Customer Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.customer_phone"
                                                      label="Customer Phone"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.weight"
                                                      label="Weight"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.departure_point"
                                                      label="Departure Point"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.delivery_point"
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
                        <td class="text-xs-center">{{ props.item.departure_point }}</td>
                        <td class="text-xs-center">{{ props.item.delivery_point }}</td>
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
    export default {
        mounted() {
            this.$instance.get(this.api)
                .then((response) => {
                    if (!response.data.count) {
                        this.fillData();
                    } else {
                        this.orders = response.data.results;
                    }
                })
                .catch(function (error) {
                    this.showError(error);
                });
        },

        data() {
            return {
                api: 'orders/parcels/',
                snackbar: false,
                color: '#C12828',
                timeout: 5000,
                errorText: '',
                dialog: false,
                search: '',
                headers: [
                    {
                        text: 'Customer`s name',
                        align: 'left',
                        sortable: true,
                        value: 'customer_name'
                    },
                    {text: 'Customer`s phone', value: 'customer_phone', align: 'center'},
                    {text: 'Weight, kg', value: 'weight', align: 'center'},
                    {text: 'Departure point', value: 'departure_point', align: 'center'},
                    {text: 'Delivery point', value: 'delivery_point', align: 'center'},
                    {text: 'Actions', value: 'customer_name', sortable: false}
                ],
                editedIndex: -1,
                editedItem: {
                    customer_name: '',
                    customer_phone: '',
                    weight: 0,
                    departure_point: '',
                    delivery_point: '',
                },
                defaultItem: {
                    customer_name: '',
                    customer_phone: '',
                    weight: 0,
                    departure_point: '',
                    delivery_point: '',
                },
                orders: []
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
                this.$instance.get('locations/locations/')
                    .then((response) => {
                        if (response.data.count < 2) {
                            console.log('Not enough locations to form an order');
                            return;
                        } else {
                            this.$instance.post(this.api, {
                                "customer_phone": '51231',
                                "customer_name": 'Lebowski',
                                "weight": 86,
                                "departure_point": response.data.results[0].id,
                                "delivery_point": response.data.results[1].id,
                            });

                            this.$instance.post(this.api, {
                                "customer_name": 'Elizabeth',
                                "customer_phone": '123432',
                                "weight": 62,
                                "departure_point": response.data.results[1].id,
                                "delivery_point": response.data.results[0].id,
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            editItem(item) {
                this.editedIndex = this.orders.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
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
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            showError(error) {
                this.errorText = '';
                let errorMessage = '';

                for (let item in error.response.data)
                    for (let message of error.response.data[item])
                        errorMessage += `${item}: ${message} \n`;

                this.errorText = errorMessage;
                this.snackbar = true;
            },

            save() {
                if (this.editedIndex > -1) {
                    // Edition
                    var newItem = this.editedItem;
                    var newItemIndex = this.editedIndex;

                    this.$instance.patch(`${this.api}${this.editedItem.id}/`, {
                        "customer_name": this.editedItem.customer_name,
                        "customer_phone": this.editedItem.customer_phone,
                        "weight": this.editedItem.weight,
                        "departure_point": this.editedItem.departure_point,
                        "delivery_point": this.editedItem.delivery_point,
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
                        "customer_name": this.editedItem.customer_name,
                        "customer_phone": this.editedItem.customer_phone,
                        "weight": this.editedItem.weight,
                        "departure_point": this.editedItem.departure_point,
                        "delivery_point": this.editedItem.delivery_point,
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
