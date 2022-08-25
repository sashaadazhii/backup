<template>
  <div class="header__wrapper">
    <div class="header__inner" :class="{'-open': sidebarOpen}">
      <div class="header__left">
        <div class="header__icon"><i class="i-directions_car" /></div>
        <router-link :to="`/customers`">
          <div class="header__title">Customers</div>
        </router-link>
        <div class="header__line">/</div>
        <div class="header__title" @click="$router.back()">{{ customer.firstName }} {{ customer.lastName }}</div>
        <div class="header__line">/</div>

        <div v-if="vehicleUid" class="header__name">
          <i class="i-directions_car" />
          {{ vehicle.make }} {{ vehicle.model }}
          <span> {{ vehicle.year }}</span>
        </div>
        <div v-else class="header__name">Add New Vehicle</div>
      </div>
      <div class="header__right">
        <Button label="Cancel" icon="i-circle_close" border circle size="small" @click="$router.back()" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'

export default {
  name: 'NewVehicleHeader',
  components: {Button},

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
      vehicle: s => s.company.vehicles.vehicle,
      sidebarOpen: s => s.modules.sidebarOpen
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
