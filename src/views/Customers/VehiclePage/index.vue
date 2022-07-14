<template>
  <div class="page-inner">
    <TheHeader />
    <div class="vehicle__wrapper">
      <div class="vehicle__header">
        <div class="vehicle__header-link" :class="{active: component === 'VehicleDetails'}" @click="component = 'VehicleDetails'">
          <i class="i-directions_car" />
          <span>Vehicle Details</span>
        </div>

        <div class="vehicle__header-link" :class="{active: component === 'VehicleTires'}" @click="component = 'VehicleTires'">
          <i class="i-tire" />
          <span>Tires</span>
        </div>
      </div>
      <component :is="component" />
    </div>
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import VehicleDetails from './VehicleDetails'
import VehicleTires from './VehicleTires'

export default {
  name: 'VehiclePage',
  components: {TheHeader, VehicleDetails, VehicleTires},
  data() {
    return {
      component: 'VehicleDetails'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
