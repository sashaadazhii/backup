<template>
  <div class="block__wrapper">
    <div class="field__dropdown">
      <Dropdown
        :modelValue="card.customer"
        :options="customers"
        searchPlaceholder="Type customer’s name"
        optionLabel="name"
        title="Customer"
        :error="error('vehicleUID')"
        search
        @change="search"
      >
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <i class="i-user" />
            <span>{{ option.name }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="field__dropdown">
      <Dropdown
        :modelValue="card.vehicle"
        :options="vehicles"
        title="Vehicle"
        searchPlaceholder="Vehicle"
        :disabled="!this.vehicles.length"
        :error="error('vehicleUID')"
        @change="selectVehicle"
      >
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <i class="i-directions_car" />
            <span v-if="value">{{ value.make }} {{ value.model }} {{ value.year }}</span>
            <span class="-placeholder" v-else>Choose customer’s vehicle</span>
          </div>
        </template>
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <i class="i-directions_car" />
            <span>{{ option.make }} {{ option.model }} {{ option.year }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  components: {Dropdown},
  data() {
    return {
      customer: null,
      vehicle: null,
      vehicles: []
    }
  },
  async created() {
    await this.fetchCustomers()
  },
  computed: {
    ...mapState({
      customers: s => {
        const customers = s.company.card.customers
        return customers.map(c => {
          c.name = `${c.firstName} ${c.lastName}`
          return c
        })
      },
      card: s => s.company.card.card,
      errors: s => s.company.card.errors
    })
  },
  methods: {
    ...mapActions({
      fetchCustomers: 'company/card/fetchCustomers',
      fetchVehicles: 'company/vehicles/fetchVehicles'
    }),
    ...mapMutations({
      setCustomer: 'company/card/setCustomer',
      setVehicle: 'company/card/setVehicle'
    }),
    async search(e) {
      this.setCustomer(e.value)
      if (e.value) this.vehicles = await this.fetchVehicles(e.value.uid)
      else this.vehicles = []
      this.setVehicle(null)
    },
    selectVehicle(e) {
      this.setVehicle(e.value)
    },
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
