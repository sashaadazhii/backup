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
        <div class="header__name">
          <i class="i-directions_car" />
          {{ vehicle.make }} {{ vehicle.model }}
          <span> {{ vehicle.year }}</span>
        </div>
        <Label :label="'Mileage ' + vehicle.odometer + ' mi.'" border class="header__label" />
        <!--
        <div class="header__vehicle">
          <i class="i-directions_car" />
          {{ vehicle.make }} {{ vehicle.model }}
          <span> {{ vehicle.year }}</span>
        </div>
        <div class="header__vehicle-odometer">
          Mileage
          <span>{{ vehicle.odometer }} mi.</span>
        </div> -->
      </div>
      <div class="header__right">
        <Button icon="i-circle_close" border circle size="small" @click="$router.back()" />

        <!-- <button class="header__close" @click="$router.back()">
          <i class="i-circle_close" />
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'

export default {
  name: 'VehiclePageHeader',
  components: {Button, Label},
  data() {
    return {
      isLoading: false
    }
  },
  async created() {
    const uid = this.$route.params.uid
    const vehicleUid = this.$route.params.vehicleUid
    if (!this.customer?.uid) await this.find(uid)
    if (!this.vehicle?.uid) await this.findVehicle(vehicleUid)
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
      findVehicle: 'company/vehicles/find',
      delete: 'company/vehicles/delete',
      fetchVinCar: 'modules/findByVin'
    }),
    ...mapMutations({
      setNewVehicle: 'company/vehicles/setNewVehicle'
    }),
    openModal() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to delete ${this.vehicle.make}  ${this.vehicle.model} ${this.vehicle.year} from the customer vehicles?`,
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up',
        accept: async () => {
          await this.delete({vehicleUID: this.vehicle.uid, customerUID: this.vehicle.customerUID})
          this.$router.back()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
