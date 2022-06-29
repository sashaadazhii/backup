<template>
  <div class="vendors__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Expense Account</div>
        <div class="table__header-title">Total</div>
      </div>
      <div class="table__main">
        <div v-for="(vendor, idx) of vendors" :key="idx" class="table__row">
          <div class="table__cell">{{ vendor.expenseAccount }}</div>
          <div class="table__cell">{{ formatter(vendor.total) }}</div>
        </div>
      </div>
      <div class="table__footer">
        <div class="table__footer-column">
          <div class="table__footer-row">
            <div class="table__footer-cell">HST Total:</div>
            <div class="table__footer-cell">$1,298.32</div>
          </div>
          <div class="table__footer-row">
            <div class="table__footer-cell">Sub Total:</div>
            <div class="table__footer-cell">$1,298.32</div>
          </div>
          <div class="table__footer-row">
            <div class="table__footer-cell">Cheque Total:</div>
            <div class="table__footer-cell">$1,298.32</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from './TheHeader'

export default {
  name: 'VendorReport',
  components: {Header},
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
      vendors: s => s.vendors.vendorReport
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
