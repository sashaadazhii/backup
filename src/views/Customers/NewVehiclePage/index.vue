<template>
  <div class="page-inner">
    <TheHeader />
    <component :is="component" @changeComponent="changeComponent" />
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import VehicleVin from './NewVehicleVin'
import VehicleComponent from './NewVehicleComponent'

import {mapMutations} from 'vuex'

export default {
  name: 'NewVehiclePage',
  components: {TheHeader, VehicleComponent, VehicleVin},
  data() {
    return {
      component: 'VehicleVin'
    }
  },
  created() {
    const uid = this.$route.params.vehicleUid
    if (uid) this.component = 'VehicleComponent'
  },
  methods: {
    ...mapMutations({
      setVehicleByVin: 'modules/setVehicleByVin'
    }),
    changeComponent(component) {
      this.component = component
    }
  },
  beforeUnmount() {
    this.setVehicleByVin(null)
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
