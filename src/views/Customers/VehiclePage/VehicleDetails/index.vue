<template>
  <div class="vehicle__inner">
    <div class="vehicle__left">
      <div class="vehicle__block general">
        <div class="vehicle__block-header">General</div>
        <div class="vehicle__block-body body">
          <div class="body__row">
            <div class="body__row-title">License:</div>
            <div class="body__row-text">{{ vehicle.license }}</div>
          </div>
          <div class="body__row">
            <div class="body__row-title">VIN:</div>
            <div class="body__row-text">{{ vehicle.vin }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="vehicle__right">
      <div class="vehicle__block engine">
        <div class="vehicle__block-header">Engine</div>
        <div class="vehicle__block-body body column">
          <div class="body__cell">
            <div class="body__cell-title">Code</div>
            <div class="body__cell-text">{{ vehicle.engine?.code }}</div>
          </div>
          <div class="body__cell">
            <div class="body__cell-title">Size</div>
            <div class="body__cell-text">{{ vehicle.engine?.size }}</div>
          </div>
          <div class="body__cell">
            <div class="body__cell-title">Cylinders</div>
            <div class="body__cell-text">{{ vehicle.engine?.cylinders }}</div>
          </div>
        </div>
      </div>
      <div v-if="customFields && customFields[0]" class="vehicle__block additional">
        <div class="vehicle__block-header">Additional</div>
        <div class="vehicle__block-body body">
          <div v-for="(field, idx) of customFields" :key="idx" class="body__row">
            <div class="body__row-title blue">{{ field.key }}</div>
            <div class="body__row-text">{{ field.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'VehiclePageDetails',
  computed: {
    ...mapState({
      vehicle: s => s.company.vehicles.vehicle
    }),
    customFields() {
      if (!this.vehicle?.customFields) return false
      return Object.entries(this.vehicle?.customFields).map(([key, value]) => ({key, value}))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
