<template>
  <div class="component__wrapper">
    <div class="component__block">
      <y-input
        v-maska="'XXXXXXXXXXXXXXXXX'"
        :modelValue="newVehicle.vin"
        title="VIN"
        placeholder="VIN"
        :error="error('vin')"
        :errorMessage="errorMessage('vin')"
        @update:modelValue="changeVehicle({key: 'vin', value: $event})"
      />
      <y-input
        :modelValue="newVehicle.license"
        title="License"
        placeholder="License"
        @update:modelValue="changeVehicle({key: 'license', value: $event})"
      />
    </div>
    <div class="component__block">
      <div class="field__select">
        <div class="field__title">Brand</div>
        <Dropdown
          :modelValue="newVehicle.make"
          :list="vehicleMakes"
          class="customers-dropdown"
          :error="error('make')"
          placeholder="Brand"
          search
          @update:modelValue="selectBrand"
        />
      </div>
      <div class="field__select">
        <div class="field__title">Model</div>
        <Dropdown
          :modelValue="newVehicle.model"
          :list="vehicleModels"
          :error="error('model')"
          class="customers-dropdown"
          placeholder="Model"
          :is-disabled="!!!newVehicle.make"
          @update:modelValue="changeVehicle({key: 'model', value: $event})"
        />
      </div>
      <div class="field__select">
        <div class="field__title">Type</div>
        <Dropdown
          :modelValue="newVehicle.vehicleType"
          :error="error('vehicleType')"
          :list="vehicleTypes"
          class="customers-dropdown"
          placeholder="Type"
          @update:modelValue="changeVehicle({key: 'vehicleType', value: $event})"
        />
      </div>
      <y-input
        v-maska="'####'"
        :modelValue="newVehicle.year"
        title="Year"
        placeholder="Enter year"
        :error="error('year')"
        @update:modelValue="changeVehicle({key: 'year', value: $event})"
      />
      <y-input
        v-maska="'#########'"
        :modelValue="newVehicle.odometer"
        title="Mileage"
        placeholder="Enter mileage"
        @update:modelValue="changeVehicle({key: 'odometer', value: $event})"
      />
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Dropdown from '@/components/Dropdown(new)'

export default {
  name: 'NewVehicleGeneralComponent',
  components: {Dropdown},
  props: {
    errors: {
      type: Array,
      required: true
    },
    asyncErrors: {
      type: Array
    }
  },
  data() {
    return {
      vehicleModelsFormatted: [],
      vehicleTypes: ['SUV', 'Sedan', 'Coupe', 'Wagon', 'Hatchback', 'Minivan', 'Van', 'Pickup']
    }
  },
  emits: {
    changeComponent: null
  },
  async created() {
    if (this.newVehicle.make && !this.vehicleModels.length) this.fetchVehicleModels(this.newVehicle.make)
    if (!this.vehicleMakes.length) await this.fetchVehicleMakes()
  },
  computed: {
    ...mapState({
      newVehicle: s => s.company.vehicles.newVehicle,
      vehicleMakes: s => s.modules.vehicleMakes,
      vehicleModels: s => s.modules.vehicleModels
    })
  },
  methods: {
    ...mapMutations({
      changeVehicle: 'company/vehicles/changeVehicle'
    }),
    ...mapActions({
      fetchVehicleMakes: 'modules/fetchVehicleMakes',
      fetchVehicleModels: 'modules/fetchVehicleModels'
    }),
    async selectBrand(e) {
      if (this.newVehicle.make === e) return
      this.changeVehicle({key: 'make', value: e})
      this.changeVehicle({key: 'model', value: null})
      await this.fetchVehicleModels(e)
    },
    error(name) {
      const asyncErrors = this.asyncErrors.find(err => err.$property === name)
      if (asyncErrors) return true
      const error = this.errors.find(err => err.$property === name)
      if (error && name === 'model' && !this.newVehicle.make) return false
      if (error) return true
    },
    errorMessage(name) {
      const error = this.asyncErrors.find(err => err.$property === name)
      if (error) return error.$message
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
