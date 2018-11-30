<template>
  <v-expansion-panel class="mt-5" popout>
    <v-expansion-panel-content
        v-for="(item,i) in panels"
        :key="i"
        :value="panel[i]"
        :disabled="(i > currentPanelIndex + 1) || (i < currentPanelIndex)"
    >
      <div slot="header" @click="onPanelClick(i)">{{item.header}}</div>
      <v-card>
        <v-layout pa-5>
          <location v-if="item.componentName === 'Location'"/>
          <vehicle-type v-if="item.componentName === 'VehicleType'"/>
          <order v-if="item.componentName === 'Order'"/>
        </v-layout>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import { Location, VehicleType, Order} from '../components';

  export default {
    name: "NewOrderPage",
    components: {
      Location,
      VehicleType,
      Order
    },
    data() {
      return {
        panels: [
          {
            header: 'Start location',
            componentName: 'Location',
          },
          {
            header: 'End location',
            componentName: 'Location',
          },
          {
            header: 'Vehicle',
            componentName: 'VehicleType',
          },
          {
            header: 'Order',
            componentName: 'Order',
          },

        ],
        currentPanelIndex: 0
      }
    },
    computed: {
      panel() {
        return this.panels.map((panel, i) => {
          return i === this.currentPanelIndex
        });
      }
    },
    methods: {
      onPanelClick(i) {
        this.currentPanelIndex = i;
      }
    }
  }
</script>

<style scoped>

</style>
