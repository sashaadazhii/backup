<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__title">Add Work Order</div>
        <div class="modal__close" @click="close"><i class="i-circle_close" /></div>
      </div>
      <div class="modal__main">
        <Dropdown
          v-model="customer"
          optionLabel="name"
          :options="customers"
          search
          searchPlaceholder="Search Customer"
          title="Customer"
          async
          :error="v$.customer.$error"
          @asyncSearch="searchCustomer"
          @change="selectCustomer"
        >
        </Dropdown>
        <Dropdown
          v-model="vehicle"
          :error="v$.vehicle.$error"
          optionLabel="name"
          :options="vehicles"
          placeholder="Select vehicle"
          :disabled="!customer || !vehicles.length"
          title="Vehicle"
        >
        </Dropdown>
        <Dropdown
          v-model="technician"
          :options="technicians"
          optionLabel="name"
          placeholder="Select Technicians"
          title="Technicians"
          search
          async
          @asyncSearch="searchTechs"
        >
        </Dropdown>
        <Dropdown
          v-model="serviceAdvisor"
          :options="advisors"
          optionLabel="name"
          placeholder="Select Service Advisor"
          title="Service Advisor"
          search
          async
          @asyncSearch="searchAdvisor"
        >
        </Dropdown>
      </div>
      <div class="modal__footer">
        <Button label="Save" size="large" :loading="isLoading" @click="save" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapActions} from 'vuex'
import Dropdown from '@/components/Yaro/Dropdown'
import Button from '@/components/Yaro/Button'
// import {required, requiredIf, between, minLength, maxLength, numeric, helpers} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'

export default {
  name: 'AddCardTemplateModal',
  components: {Dropdown, Button},
  data() {
    return {
      isLoading: false,
      customer: null,
      customers: [],
      vehicle: null,
      vehicles: [],
      technician: null,
      technicians: [],
      serviceAdvisor: null,
      advisors: [],
      v$: useVuelidate()
    }
  },
  methods: {
    ...mapActions({
      searchCustomers: 'company/customers/search',
      searchUsers: 'company/users/search',
      createOrder: 'workOrder/create'
    }),
    async searchCustomer({query}) {
      const customers = await this.searchCustomers({search: query})
      this.customers = customers.data.data.map(c => {
        c.name = `${c.firstName} ${c.lastName}`
        return c
      })
    },
    async searchTechs({query}) {
      const techs = await this.searchUsers({role: 'technician', search: query})
      this.technicians = techs.map(t => {
        t.name = `${t.firstName} ${t.lastName}`
        return t
      })
    },
    async searchAdvisor({query}) {
      const advisors = await this.searchUsers({role: 'service-advisor', search: query})
      this.advisors = advisors.map(a => {
        a.name = `${a.firstName} ${a.lastName}`
        return a
      })
    },
    async selectCustomer({value}) {
      this.vehicle = null
      const cusVehicles = value?.vehicles || []
      this.vehicles = cusVehicles.map(v => {
        v.name = `${v.make} ${v.model} ${v.year}`
        return v
      })
    },
    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return
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
      if (this.technician) {
        order.technician = {}
        order.technician.id = this.technician.id
      }
      try {
        this.isLoading = true
        await this.createOrder(order)
        this.$vfm.hide('AddWorkOrder')
      } finally {
        this.isLoading = false
      }
    }
  },
  validations() {
    return {
      customer: {required},
      vehicle: {required}
      // vehicle: {
      //   vin: {
      //     required,
      //     minLengthValue: minLength(17)
      //   }
      // make: {required},
      // model: {required},
      // year: {
      //   required,
      //   minLength: minLength(4),
      //   maxLength: maxLength(4),
      //   between: between(1800, new Date().getFullYear()),
      //   numeric
      // },
      // engine: {
      //   required,
      //   size: {required},
      //   cylinders: {required, numeric},
      //   code: {required}
      // },
      // vehicleType: {required},
      // customFields: {
      //   $each: helpers.forEach({
      //     name: {requiredIf: requiredIf(() => this.vehicle.customFields[0]?.name)},
      //     value: {requiredIf: requiredIf(() => this.vehicle.customFields[0]?.value)}
      //   })
      // }
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
