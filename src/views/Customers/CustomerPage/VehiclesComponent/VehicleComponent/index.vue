<template>
  <div class="vehicle__wrapper" @click="openVehicle">
    <div class="vehicle__icon"><i class="i-directions_car" /></div>
    <div class="vehicle__name">{{ vehicle.make }} {{ vehicle.model }}</div>
    <div class="vehicle__year">{{ vehicle.year }}</div>
    <div v-if="vehicle.odometer" class="vehicle__odometer">
      Mileage {{ vehicle.odometer.toLocaleString('fr-FR') }} mi.
    </div>
    <div v-else></div>
    <div class="vehicle__select" ref="dropdown">
      <Dropdown :modelValue="action" :list="actionsList" @update:modelValue="selectAction" actionMenu>
        <template #option="{label: label}">
          <div class="vehicle__select-option">
            <i v-if="label === 'Edit'" class="i-edit" />
            <i v-if="label === 'Delete'" class="i-remove_circle red" />
            <span>{{ label }}</span>
          </div>
        </template>
        <template #menu>
          <div class="vehicle__select-menu">
            <i class="i-more_horiz" />
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown(new)'
import {mapMutations} from 'vuex'
import DeleteModal from './DeleteModal'

export default {
  name: 'CustomerPageVehicles',
  components: {Dropdown},
  props: {
    vehicle: {
      type: Object,
      requaired: true
    }
  },
  data() {
    return {
      isLoading: false,
      action: null,
      actionsList: ['Edit', 'Delete']
    }
  },
  methods: {
    ...mapMutations({
      setVehicle: 'company/vehicles/setVehicle'
    }),
    async selectAction(action) {
      if (this.isLoading) return
      if (action === 'Delete') {
        this.openModal()
      } else if (action === 'Edit') {
        this.setVehicle(this.vehicle)
        this.$router.push(`/customers/${this.vehicle.customerUID}/vehicles/${this.vehicle.uid}/edit`)
      }
    },
    openModal() {
      this.$vfm.show(
        {
          component: DeleteModal,
          bind: {
            name: 'DeleteModal'
          }
        },
        this.vehicle
      )
    },
    openVehicle(e) {
      if (!this.$refs.dropdown || this.$refs.dropdown.contains(e.target)) return
      this.setVehicle(this.vehicle)
      this.$router.push(`/customers/${this.vehicle.customerUID}/vehicles/${this.vehicle.uid}/`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
