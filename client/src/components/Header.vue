<template>
  <v-toolbar app>
    <v-flex xs1 ml-3>
      <v-menu open-on-hover close-on-content-click>
        <v-toolbar-title slot="activator">
          <v-icon>fas fa-bars</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile class="menu-item">
            <v-list-tile-title v-text="'Vehicle types'" />
          </v-list-tile>
          <v-list-tile class="menu-item">
            <v-list-tile-title v-text="'Page 2'" />
          </v-list-tile>
          <v-list-tile class="menu-item">
            <v-list-tile-title v-text="'Page 3'" />
          </v-list-tile>
          <v-list-tile class="menu-item">
            <v-list-tile-title v-text="'Page 4'"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
    <v-spacer />
    <v-flex xs3 mt-3>
      <p class="display-1 font-weight-black">Traffic Optimizer</p>
    </v-flex>
  </v-toolbar>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>

</style>
