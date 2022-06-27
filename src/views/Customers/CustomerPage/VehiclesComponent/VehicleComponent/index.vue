<template>
  <div class="vehicle__wrapper" @click="openVehicle">
    <div class="vehicle__icon"><i class="i-directions_car" /></div>
    <div class="vehicle__name">{{ vehicle.make }} {{ vehicle.model }}</div>
    <div class="vehicle__year">{{ vehicle.year }}</div>
    <div v-if="vehicle.odometer" class="vehicle__odometer">Mileage {{ vehicle.odometer.toLocaleString('fr-FR') }} mi.</div>
    <div v-else></div>
    <div class="vehicle__select" ref="menu">
      <Menu :list="actionsList" />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Yaro/Menu'
import {mapActions, mapMutations} from 'vuex'

export default {
  name: 'CustomerPageVehicles',
  components: {Menu},
  props: {
    vehicle: {
      type: Object,
      requaired: true
    }
  },
  data() {
    return {
      isLoading: false,
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            this.setVehicle(this.vehicle)
            this.$router.push(`/customers/${this.vehicle.customerUID}/vehicles/${this.vehicle.uid}/edit`)
          }
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => this.openModal()
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      delete: 'company/vehicles/delete'
    }),
    ...mapMutations({
      setNewVehicle: 'company/vehicles/setNewVehicle',
      setVehicle: 'company/vehicles/setVehicle',
    }),
    async selectAction(action) {
      if (this.isLoading) return
      if (action === 'Delete') {
        this.openModal()
      } else if (action === 'Edit') {
        this.setNewVehicle(this.vehicle)
        this.$router.push(`/customers/${this.vehicle.customerUID}/vehicles/${this.vehicle.uid}/edit`)
      }
    },
    openModal() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to delete ${this.vehicle.make}  ${this.vehicle.model} ${this.vehicle.year} from the customer vehicles?`,
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up',
        accept: async () => {
          await this.delete({vehicleUID: this.vehicle.uid, customerUID: this.vehicle.customerUID})
        }
      })
    },
    openVehicle(e) {
      if (!this.$refs.menu || this.$refs.menu.contains(e.target)) return
      this.setVehicle(this.vehicle)
      this.$router.push(`/customers/${this.vehicle.customerUID}/vehicles/${this.vehicle.uid}/`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
