<template>
  <div class="header__wrapper">
    <div class="header__inner" :class="{'-open': sidebarOpen}">
      <div class="header__left">
        <div class="header__icon"><i class="i-customers"></i></div>
        <div class="header__title" @click="$router.back()">Customers</div>
        <div class="header__line">/</div>
        <div class="header__name">{{ customer?.firstName }} {{ customer?.lastName }}</div>
      </div>
      <div class="header__right">
        <router-link :to="`/customers/${customer.uid}/new-vehicle`" class="header__btn">
          <Button label="Add New Vehicle" icon="i-add_circle" size="small" circle />
        </router-link>
        <Button icon="i-circle_close" @click="$router.back()" border circle size="small" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import _ from 'lodash'
import Button from '@/components/Yaro/Button'

export default {
  name: 'CustomerPageHeader',
  components: {Button},

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
      vehicles: s => s.company.vehicles.vehicles,
      sidebarOpen: s => s.modules.sidebarOpen
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
