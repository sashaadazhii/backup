<template>
  <div class="vendors__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Date</div>
        <div class="table__header-title">Part #</div>
        <div class="table__header-title">Expense Account</div>
        <div class="table__header-title">Amount</div>
        <div class="table__header-title">HST Total</div>
        <div class="table__header-title">Bill Total</div>
        <div class="table__header-title"></div>
      </div>
      <div class="table__main">
        <Expense v-for="(expense, idx) of expenses" :key="idx" :expense="expense" />
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from './TheHeader'
import Expense from './Expense'

export default {
  name: 'TheVendors',
  components: {Header, Expense},

  computed: {
    ...mapState({
      expenses: s => s.vendors.expenses
    })
  },
  methods: {
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
