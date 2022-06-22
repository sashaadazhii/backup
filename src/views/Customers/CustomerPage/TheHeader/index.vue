<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__left">
        <div class="header__icon"><i class="i-customers"></i></div>
        <div class="header__title">Customers</div>
        <div class="header__line">/</div>
        <div class="header__name">{{ customer?.firstName }} {{ customer?.lastName }}</div>
      </div>
      <div class="header__right">
        <router-link :to="`/customers/${customer.uid}/new-vehicle`" class="header__btn">
          <i class="i-add_circle" />
          <span>Add New Vehicle</span>
        </router-link>
        <button class="header__close" @click="$router.back()">
          <i class="i-circle_close" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import _ from 'lodash'

export default {
  name: 'CustomerPageHeader',

  async created() {
    const uid = this.$route.params.uid
    if (uid) {
      const isEmptyCustomer = _.isEmpty(this.customer)
      if (isEmptyCustomer) await this.find(uid)
      if (!this.vehicles.length || this.vehicles[0].customerUID !== uid) await this.fetchVehicles(this.customer.uid)
    }
  },
  computed: {
    ...mapState({
      customer: s => s.company.customers.customer,
      vehicles: s => s.company.vehicles.vehicles
    })
  },
  methods: {
    ...mapActions({
      find: 'company/customers/find',
      fetchVehicles: 'company/vehicles/fetch'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
