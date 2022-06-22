<template>
  <div class="component__wrapper">
    <div v-for="(field, idx) of newVehicle.customFields" :key="idx" class="component__block">
      <y-input v-model="field.name" title="Name" placeholder="Field name" :error="error({idx, name: 'name'})" />
      <y-input v-model="field.value" title="Value" placeholder="Field value" :error="error({idx, name: 'value'})" />

      <button class="field__btn" @click="removeVehicleFields(idx)">
        <i class="i-remove_circle_outline" />
      </button>
    </div>
    <button class="component__btn" @click="addField">
      <i class="i-add_circle_outline" />
      <span>Add Line</span>
    </button>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'NewVehicleAdditionalComponent',
  data() {
    return {}
  },
  props: {
    errors: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      newVehicle: s => s.company.vehicles.newVehicle
    })
  },
  methods: {
    ...mapMutations({
      changeVehicle: 'company/vehicles/changeVehicle',
      addVehicleFields: 'company/vehicles/addVehicleFields',
      removeVehicleFields: 'company/vehicles/removeVehicleFields'
    }),
    addField() {
      const field = {name: null, value: null}
      this.addVehicleFields(field)
    },
    error({idx, name}) {
      const errors = this.errors.find(err => err.$property === 'customFields')?.$response?.$errors
      if (errors && errors[idx][name][0]) return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
