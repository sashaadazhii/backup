<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__icon"><i class="i-volume_up" /></div>
      <div class="modal__title">Hey, wait!</div>
      <div class="modal__subtitle">
        Are you sure, you want to delete
        <span>{{ vehicle.make }} {{ vehicle.model }} {{ vehicle.year }}</span>
        from the customer vehicles?
      </div>
      <div class="modal__buttons">
        <button class="modal__button red" @click="deleteVehicle">
          <span>Delete</span>
          <Loader :show="isLoading" color="#f37878" />
        </button>
        <button class="modal__button" @click="close">Cancel</button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import Loader from '@/components/loader'

export default {
  name: 'DeleteModal',
  components: {Loader},
  data() {
    return {
      vehicle: {},
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      delete: 'company/vehicles/delete'
    }),
    ...mapMutations({
      removeVehiclefromCustomer: 'company/customers/removeVehicle',
      removeVehicle: 'company/vehicles/removeVehicle'
    }),
    beforeOpen(e) {
      this.vehicle = e.ref.params._rawValue
    },
    async deleteVehicle() {
      try {
        this.isLoading = true
        await this.delete(this.vehicle.uid)
        this.removeVehicle(this.vehicle.uid)
        this.removeVehiclefromCustomer({uid: this.vehicle.customerUID, vehicleUID: this.vehicle.uid})
        this.$router.back()
        this.$vfm.hide('DeleteModal')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
