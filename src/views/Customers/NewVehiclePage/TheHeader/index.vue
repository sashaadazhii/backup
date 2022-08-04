<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__left">
        <div class="header__icon"><i class="i-directions_car" /></div>
        <div class="header__title">
          <div class="header__title-name">{{ customer.firstName }} {{ customer.lastName }}</div>
          <div class="header__title-line">/</div>
          <div v-if="vehicleUid" class="header__title-vehicle">
            <i class="i-directions_car" />
            {{ vehicle.make }} {{ vehicle.model }}
            <span> {{ vehicle.year }}</span>
          </div>
          <div v-else class="header__title-vehicle">Add New Vehicle</div>
        </div>
      </div>
      <div class="header__right">
        <button class="header__button" @click="$router.back()">
          <i class="i-circle_close" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'NewVehicleHeader',
  data() {
    return {
      vehicleUid: this.$route.params.vehicleUid
    }
  },

  async created() {
    const uid = this.$route.params.uid
    if (this.customer?.uid !== uid) await this.find(uid)
    if (this.vehicleUid && !this.vehicle?.uid) await this.findVehicle(this.vehicleUid)
  },
  computed: {
    ...mapState({
      customer: s => s.company.customers.customer,
      vehicle: s => s.company.vehicles.vehicle
    })
  },
  methods: {
    ...mapActions({
      find: 'company/customers/find',
      findVehicle: 'company/vehicles/find'
    }),
    ...mapMutations({
      setNewVehicle: 'company/vehicles/setNewVehicle'
    })
  },
  beforeUnmount() {
    this.setNewVehicle({})
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
