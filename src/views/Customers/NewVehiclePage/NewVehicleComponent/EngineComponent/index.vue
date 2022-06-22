<template>
  <div class="component__wrapper">
    <div class="component__block">
      <y-input
        :modelValue="newVehicle.engine.code"
        title="Engine Code"
        placeholder="Engine code"
        :error="error('code')"
        @update:modelValue="changeVehicleEngine({key: 'code', value: $event})"
      />
      <y-input
        v-maska="{mask: 'HHHH', tokens: {H: {pattern: /[0-9.]/}}}"
        :modelValue="newVehicle.engine.size"
        title="Engine Size"
        placeholder="Engine size"
        :error="error('size')"
        @update:modelValue="changeVehicleEngine({key: 'size', value: $event})"
      />
      <y-input
        v-maska="'##'"
        :modelValue="newVehicle.engine.cylinders"
        title="Cylinders"
        placeholder="Cylinders"
        :error="error('cylinders')"
        @update:modelValue="changeVehicleEngine({key: 'cylinders', value: $event})"
      />
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'NewVehicleEngineComponent',

  props: {
    errors: {
      type: Object,
      required: true
    }
  },
  async created() {
    if (!this.newVehicle.engine) this.changeVehicle({key: 'engine', value: {}})
  },
  computed: {
    ...mapState({
      newVehicle: s => s.company.vehicles.newVehicle
    })
  },
  methods: {
    ...mapMutations({
      changeVehicle: 'company/vehicles/changeVehicle',
      changeVehicleEngine: 'company/vehicles/changeVehicleEngine'
    }),
    error(name) {
      const error = this.errors.find(err => err.$property === name)
      if (error) return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
