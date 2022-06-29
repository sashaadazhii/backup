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
        <div v-for="(vendor, idx) of vendors" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon">
            <i class="i-calendar" />
            {{ vendor.date }}
          </div>
          <div class="table__cell">{{ vendor.part }}</div>
          <div class="table__cell label" :class="labelColor(vendor.expenseAccount)">
            {{ vendor.expenseAccount }}
          </div>
          <div class="table__cell">{{ formatter(vendor.amount) }}</div>
          <div class="table__cell">{{ vendor.hst.toFixed(2) }}</div>
          <!-- TODO: replace with Label -->
          <div class="table__cell label-square">{{ formatter(vendor.billTotal) }}</div>
          <div class="table__cell">
            <Menu :list="actionsList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from './TheHeader'
import Menu from '@/components/Yaro/Menu'

export default {
  name: 'TheVendors',
  components: {Header, Menu},
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {}
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => {}
        }
      ]
    }
  },
  computed: {
    ...mapState({
      vendors: s => s.vendors.vendorExpenses
    })
  },
  methods: {
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    },
    labelColor(expenseAccount) {
      switch (expenseAccount) {
        case 'Parts for Relase':
          return 'blue'
        case 'Meals for Stuff':
          return 'orange'
        case 'Office Supplies':
          return 'green'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
