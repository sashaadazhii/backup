<template>
  <div class="block__wrapper">
    <div class="field__dropdown">
      <div class="field__title">Customer</div>
      <Dropdown
        :modelValue="card.customer"
        :options="customers"
        placeholder="Customer"
        optionLabel="name"
        filter
        :filterFields="['name']"
        @change="search"
      >
        <template #value="{value}">
          <div class="main__dropdown-option">
            <span v-if="value">{{ value.firstName }} {{ value.lastName }}</span>
            <span v-else>Customer</span>
          </div>
        </template>
        <template #option="{option}">
          <div class="main__dropdown-label">
            <span>{{ option.firstName }} {{ option.lastName }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="field__dropdown">
      <div class="field__title">Vehicle</div>
      <Dropdown
        :modelValue="card.vehicle"
        :options="vehicles"
        placeholder="Vehicle"
        @change="selectVehicle"
        :disabled="!this.vehicles.length"
      >
        <template #value="{value}">
          <div class="main__dropdown-option">
            <span v-if="value">{{ value.make }} {{ value.model }}</span>
            <span v-else>Vehicle</span>
          </div>
        </template>
        <template #option="{option}">
          <div class="main__dropdown-label">
            <span>{{ option.make }} {{ option.model }}</span>
          </div>
        </template>
      </Dropdown>
      <!-- <Dropdown
        :modelValue="vehicle"
        :list="vehicles"
        placeholder="Vehicle"
        @update:modelValue="selectVehicle"
        :isDisabled="!this.vehicles.length"
      >
        <template #option="{label: label}">
          <div class="field__dropdown-option">
            <span>{{ label.make }} {{ label.model }}</span>
          </div>
        </template>
        <template #label="{label: label}">
          <div class="field__dropdown-label">
            <span>{{ label.make }} {{ label.model }}</span>
          </div>
        </template>
      </Dropdown> -->
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
      vehicle: null
    }
  },
  async created() {
    await this.fetchCustomers()
  },
  computed: {
    ...mapState({
      // customers: s => s.company.card.customers,
      customers: s => {
        const customers = s.company.card.customers
        return customers.map(c => {
          c.name = `${c.firstName} ${c.lastName}`
          return c
        })
      },
      card: s => s.company.card.card
    }),
    vehicles() {
      return this.card.customer?.vehicles || []
    }
  },
  methods: {
    ...mapActions({
      fetchCustomers: 'company/card/fetchCustomers'
    }),
    ...mapMutations({
      setCustomer: 'company/card/setCustomer',
      setVehicle: 'company/card/setVehicle'
    }),
    search(e) {
      this.setCustomer(e.value)
      this.setVehicle(null)
    },
    selectVehicle(e) {
      this.setVehicle(e.value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
