<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Vehicle</div>
        <div class="table__header-title">Service</div>
        <div class="table__header-title">Number of Jobs</div>
        <div class="table__header-title">Parts</div>
        <div class="table__header-title">Sub Total</div>
        <div class="table__header-title">HST</div>
        <div class="table__header-title">Total</div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon">
            <i class="i-directions_car" />
            {{ report.vehicle }}
          </div>
          <div class="table__cell">{{ report.service }}</div>
          <div class="table__cell">{{ report.numberOfJobs }}</div>
          <div class="table__cell">{{ report.parts }}</div>
          <div class="table__cell">{{ report.subTotal }}</div>
          <div class="table__cell">{{ report.hst }}</div>
          <div class="table__cell">{{ formatter(report.total) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../ReportHeader'

export default {
  name: 'CustomerSalesReport',
  components: {Header},
  computed: {
    ...mapState({
      reports: s => s.reports.customerSalesReport
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
