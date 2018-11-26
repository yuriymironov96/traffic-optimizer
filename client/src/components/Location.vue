<template>
    <v-container mt-5>
        <v-layout row wrap>
            <v-flex xs10 mt-5>
                <h1 class="display-2">Location</h1>
            </v-flex>
            <v-flex xs2 mt-5>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-btn slot="activator" color="primary" dark class="mb-2">Add Location
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
                                        label="Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.address"
                                        label="Address"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.longitude"
                                        label="Longitude"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.latitude"
                                        label="Latitude"></v-text-field>
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
                :items="locations"
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
                    <td class="text-xs-center">{{ props.item.address }}</td>
                    <td class="text-xs-center">{{ props.item.longitude }}</td>
                    <td class="text-xs-center">{{ props.item.latitude }}</td>
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
            editedItem: {
                name: '',
                address: '',
                longitude: 0,
                latitude: 0,
            },
            defaultItem: {
                name: ' ',
                address: ' ',
                longitude: 0,
                latitude: 0,
            },
            locations: [
                {
                    value   : false,
                    name: 'Kyiv',
                    address: 'Kyiv',
                    longitude: -84.74,
                    latitude: 76.55,
                },
                {
                    value   : false,
                    name: 'Odys',
                    address: 'Sey',
                    longitude: 33.42,
                    latitude: 105.55,
                },{
                    value   : false,
                    name: 'Street',
                    address: 'Teerts',
                    longitude: 26.43,
                    latitude: -50.02,
                },{
                    value   : false,
                    name: 'Loc',
                    address: 'ation',
                    longitude: 52.34,
                    latitude: 21.55,
                },{
                    value   : false,
                    name: 'TooMuchKyiv',
                    address: 'Kyiv',
                    longitude: -62.24,
                    latitude: -9.67
                },{
                    value   : false,
                    name: 'Dark',
                    address: 'Side',
                    longitude: 52.34,
                    latitude: 21.55,
                },{
                    value   : false,
                    name: 'The',
                    address: 'Moon',
                    longitude: 38.16,
                    latitude: 20.75,
                },
                {
                    value   : false,
                    name: 'Center',
                    address: 'Middle',
                    longitude: 96.68,
                    latitude: -21.55,
                },{
                    value   : false,
                    name: 'Some name',
                    address: 'address',
                    longitude: 49.63,
                    latitude: 74.25,
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
            this.editedIndex = this.locations.indexOf(item)
            this.editedItem  = Object.assign({}, item)
            this.dialog      = true
        },

        deleteItem(item) {
            const index = this.locations.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.locations.splice(
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
                Object.assign(this.locations[this.editedIndex], this.editedItem)
            } else {
                this.locations.push(this.editedItem)
            }
            this.close()
        }
    }
}
</script>

<style scoped>
</style>
