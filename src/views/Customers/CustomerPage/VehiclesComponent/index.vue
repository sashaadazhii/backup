<template>
  <div v-if="showVehicles" class="vehicles__wrapper">
    <Vehicle v-for="vehicle of vehicles" :key="vehicle.uid" :vehicle="vehicle" />
  </div>
</template>

<script>
import Vehicle from './VehicleComponent'

import {mapState} from 'vuex'

export default {
  name: 'CustomerPageVehicles',
  components: {Vehicle},
  data() {
    return {
      showVehicles: false
    }
  },
  created() {
    const uid = this.$route.params.uid
    if (this.vehicles.length && this.vehicles[0].customerUID === uid) this.showVehicles = true
  },
  computed: {
    ...mapState({
      vehicles: s => s.company.vehicles.vehicles
    })
  },
  watch: {
    vehicles() {
      const uid = this.$route.params.uid
      if (this.vehicles.length && this.vehicles[0].customerUID === uid) this.showVehicles = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
