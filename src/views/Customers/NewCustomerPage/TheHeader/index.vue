<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__left">
        <div class="header__icon"><i class="i-customers" /></div>
        <div v-if="uid" class="header__title">Edit Customer</div>
        <div v-else class="header__title">Add New Customer</div>
      </div>
      <div class="header__right">
        <button class="header__button" @click="$router.back()">
          <i class="i-circle_close" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import _ from 'lodash'

export default {
  name: 'NewCustomerHeader',
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
      customer: s => s.company.customers.customer
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
