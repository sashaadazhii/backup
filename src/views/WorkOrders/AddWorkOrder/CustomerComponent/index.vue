<template>
  <div class="main__wrapper">
    <Dropdown
      :modelValue="customer"
      optionLabel="name"
      :options="customers"
      search
      searchPlaceholder="Search Customer"
      title="Customer"
      @change="selectCustomer"
    >
      <template #option="{option}">
        <div class="field__dropdown-label">
          <i class="i-user" />
          <span>{{ option.firstName }} {{ option.lastName }}</span>
        </div>
      </template>
    </Dropdown>
    <Dropdown v-model="vehicle" optionLabel="name" :options="vehicles" placeholder="Select vehicle" :disabled="!customer || !vehicles.length" title="Vehicle">
      <template #option="{option}">
        <div class="field__dropdown-label">
          <i class="i-user" />
          <span>{{ option.name }}</span>
        </div>
      </template>
    </Dropdown>
    <!-- <Dropdown
      :value="technician"
      :options="technicians"
      optionLabel="name"
      placeholder="Select Technicians"
      title="Technicians"
      search
      async
      @change="selectTech"
      @asyncSearch="fetchTechs"
    >
      <template #option="{option}">
        <div class="field__dropdown-label">
          <i class="i-user" />
          <span>{{ option.firstName }} {{ option.lastName }}</span>
        </div>
      </template>
    </Dropdown> -->
    <Dropdown
      :value="serviceAdvisor"
      :options="advisors"
      optionLabel="name"
      placeholder="Select Service Advisor"
      title="Service Advisor"
      search
      async
      @change="selectAdvisor"
      @asyncSearch="fetchAdvisor"
    >
      <template #option="{option}">
        <div class="field__dropdown-label">
          <i class="i-user" />
          <span>{{ option.firstName }} {{ option.lastName }}</span>
        </div>
      </template>
    </Dropdown>
    <Button label="Save" @click="save" />
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import Button from '@/components/Yaro/Button'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'WorkOrderCustomerComponent',
  components: {Dropdown, Button},
  data() {
    return {
      vehicles: [],
      technician: null,
      serviceAdvisor: null,
      technicians: [],
      advisors: [],
      customer: null,
      vehicle: null
    }
  },
  computed: {
    ...mapState({
      // technicians: s => s.company.users.technicians,
      customers: s => {
        const customers = s.company.customers.customers
        return customers.map(c => {
          c.name = `${c.firstName} ${c.lastName}`
          return c
        })
      }
    })
  },
  methods: {
    ...mapActions({
      searchUsers: 'company/users/search',
      create: 'workOrder/create'
    }),
    ...mapMutations({
      // setTechs: 'company/users/setTechs'
    }),
    selectCustomer({value: cus}) {
      this.$data.vehicle = null
      this.$data.customer = cus
      const cusVehicles = cus?.vehicles || []
      this.vehicles = cusVehicles.map(v => {
        v.name = `${v.make} ${v.model} ${v.year}`
        return v
      })
    },
    async fetchAdvisor({query}) {
      const advisors = await this.searchUsers({role: 'service-advisor', search: query})
      this.advisors = advisors.map(a => {
        a.name = `${a.firstName} ${a.lastName}`
        return a
      })
    },
    selectAdvisor({value}) {
      this.serviceAdvisor = value
    },
    async fetchTechs({query}) {
      const techs = await this.searchUsers({role: 'technician', search: query})
      this.technicians = techs.map(t => {
        t.name = `${t.firstName} ${t.lastName}`
        return t
      })
    },
    selectTech({value}) {
      this.technician = value
    },
    async save() {
      const customerRequests = [
        {
          requestType: 'question',
          requestName: 'test',
          requestDetails: 'test'
        }
      ]
      const {customer, vehicle} = this
      const order = {customer: {uid: customer.uid}, vehicle: {uid: vehicle.uid}, customerRequests}
      if (this.serviceAdvisor) {
        order.serviceAdvisor = {}
        order.serviceAdvisor.id = this.serviceAdvisor.id
      }
      await this.create(order)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
