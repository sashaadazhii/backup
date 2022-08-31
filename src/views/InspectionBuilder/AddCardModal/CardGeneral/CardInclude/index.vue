<template>
  <div class="block__wrapper">
    <div class="block__header">
      <span> Include on every work order</span>
      <Switch v-model="every" />
    </div>
    <Dropdown theme="white" v-model="type" :options="types" class="-full" :disabled="!every" />
    <Dropdown
      v-if="type === 'Specific Vehicle tied to a Customer'"
      theme="white"
      v-model="customer"
      :options="customers"
      searchPlaceholder="Type customer’s name"
      optionLabel="name"
      title="Customer"
      search
      :disabled="!every"
      @change="search"
    >
      <template #option="{option}">
        <div class="y-dropdown-item-custom">
          <i class="i-user" />
          <span>{{ option.name }}</span>
        </div>
      </template>
    </Dropdown>

    <Dropdown
      v-if="type === 'Specific Vehicle tied to a Customer'"
      theme="white"
      v-model="vehicle"
      :options="vehicles"
      title="Vehicle"
      searchPlaceholder="Vehicle"
      :disabled="!this.vehicles.length && !every"
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
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import {mapActions, mapState} from 'vuex'
import Switch from '@/components/Yaro/Switch'

export default {
  name: 'AddCardRelation',
  components: {Dropdown, Switch},
  data() {
    return {
      type: 'Specific Vehicle tied to a Customer',
      types: ['Specific Vehicle tied to a Customer', 'All Model Year of this type vehicle'],
      customer: null,
      vehicle: null,
      vehicles: [],
      every: false
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
      card: s => s.company.card.card
    })
  },
  methods: {
    ...mapActions({
      fetchCustomers: 'company/card/fetchCustomers',
      fetchVehicles: 'company/vehicles/fetchVehicles'
    }),
    async search(e) {
      if (e.value) this.vehicles = await this.fetchVehicles(e.value.uid)
      else this.vehicles = []
      this.vehicle = null
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
