<template>
  <div class="header__wrapper">
    <div class="header__inner"  :class="{'-open': sidebarOpen}">
      <div class="header__left">
        <div class="header__icon"><i class="i-customers" /></div>
        <div v-if="uid" class="header__title">Edit Customer</div>
        <div v-else class="header__title">Add New Customer</div>
      </div>
      <div class="header__right">
        <Button label="Cancel" icon="i-circle_close" border circle size="small" @click="$router.back()" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import _ from 'lodash'
import Button from '@/components/Yaro/Button'

export default {
  name: 'NewCustomerHeader',
  components: {Button},
  data() {
    return {
      uid: this.$route.params.uid
    }
  },
  created() {
    if (this.uid) {
      const isEmptyCustomer = _.isEmpty(this.customer)
      if (isEmptyCustomer) this.find(this.uid)
    }
  },
  computed: {
    ...mapState({
      customer: s => s.company.customers.customer,
      sidebarOpen: s => s.modules.sidebarOpen
    })
  },
  methods: {
    ...mapActions({
      find: 'company/customers/find'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
