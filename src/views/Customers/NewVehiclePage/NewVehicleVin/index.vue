<template>
  <div class="vehicle__wrapper">
    <div class="vehicle__inner">
      <div class="vehicle__header">
        <div class="vehicle__icon" :class="{orange: vinError}">
          <i v-if="vinError" class="i-report_problem" />
          <i v-else class="i-directions_car2" />
        </div>
        <div v-if="vinError" class="vehicle__title">Ooops, we coudn’t find that VIN</div>
        <div v-else class="vehicle__title">Add New Vehicle</div>
        <div v-if="vinError" class="vehicle__subtitle">
          Car not found, please check VIN and try again,In case of failure, add the vehicle manually
        </div>
        <div v-else class="vehicle__subtitle">Enter VIN number to find the vehicle data, or add info manually</div>
      </div>
      <div class="vehicle__main">
        <y-input v-maska="'XXXXXXXXXXXXXXXXX'" v-model="vin" placeholder="VIN" @input="fieldError = false" />
      </div>
      <div class="vehicle__footer">
        <button class="vehicle__button green" @click="search">
          <span>Search</span>
          <Loader :show="isLoading" />
        </button>
        <button class="vehicle__button" @click="$emit('changeComponent', 'VehicleComponent')">Add Manually</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

import useVuelidate from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'

import Loader from '@/components/loader'
export default {
  name: 'NewVehicleVin',
  components: {Loader},
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      vin: null,
      vinError: false,
      fieldError: false
    }
  },
  emits: {
    changeComponent: null
  },
  async created() {
    if (this.vehicle) this.vin = this.vehicle.vin
  },
  computed: {
    ...mapState({
      vehicle: s => s.modules.vehicleByVin
    })
  },
  methods: {
    ...mapActions({
      findByVin: 'modules/findByVin'
    }),
    ...mapMutations({
      setNewVehicle: 'company/vehicles/setNewVehicle'
    }),
    async search() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return
      try {
        this.isLoading = true
        await this.findByVin(this.vin)
        this.setNewVehicle(this.vehicle)
        this.vinError = this.fieldError = false
        this.$emit('changeComponent', 'VehicleComponent')
      } catch (err) {
        this.vinError = this.fieldError = true
        this.isLoading = false
      } finally {
        this.isLoading = false
      }
    }
  },
  validations() {
    return {
      vin: {required, minLength: minLength(17)}
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
