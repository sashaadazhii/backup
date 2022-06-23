<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Date</div>
        <div class="table__header-title">Sold Time</div>
        <div class="table__header-title">Warranty Time</div>
        <div class="table__header-title">Discount Time</div>
        <div class="table__header-title">Billable Time</div>
        <div class="table__header-title">Additional Labour</div>
        <div class="table__header-title">Labour Price</div>
        <div class="table__header-title">Parts Cost</div>
        <div class="table__header-title">Parts Price</div>
        <div class="table__header-title">Total Price</div>
        <div class="table__header-title">Total Profit</div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon">
            <i class="i-calendar" />
            {{ report.date }}
          </div>
          <div class="table__cell">
            {{ report.soldTime.toFixed(2) }}
          </div>
          <div class="table__cell">
            {{ report.warrantyTime.toFixed(2) }}
          </div>
          <div class="table__cell">{{ report.discountTime.toFixed(2) }}</div>
          <div class="table__cell">{{ report.billableTime.toFixed(2) }}</div>
          <div class="table__cell">${{ report.additionalLabour.toLocaleString('en-CA') }}</div>
          <div class="table__cell">${{ report.labourPrice.toLocaleString('en-CA') }}</div>
          <div class="table__cell">${{ report.partsCost.toLocaleString('en-CA') }}</div>
          <div class="table__cell">${{ report.partsPrice.toLocaleString('en-CA') }}</div>
          <div class="table__cell">${{ report.totalPrice.toLocaleString('en-CA') }}</div>
          <div class="table__cell">${{ report.totalProfit.toLocaleString('en-CA') }}</div>
        </div>
      </div>
      <div class="table__footer">
        <div class="table__footer-cell">Average:</div>
        <div class="table__footer-cell">{{ reports.reduce((sum, current) => sum + current.soldTime, 0).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.warrantyTime, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.discountTime, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.billableTime, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">
          ${{ (reports.reduce((sum, current) => sum + current.additionalLabour, 0) / reports.length).toLocaleString('en-CA') }}
        </div>
        <div class="table__footer-cell">${{ (reports.reduce((sum, current) => sum + current.labourPrice, 0) / reports.length).toLocaleString('en-CA') }}</div>
        <div class="table__footer-cell">${{ (reports.reduce((sum, current) => sum + current.partsCost, 0) / reports.length).toLocaleString('en-CA') }}</div>
        <div class="table__footer-cell">${{ (reports.reduce((sum, current) => sum + current.partsPrice, 0) / reports.length).toLocaleString('en-CA') }}</div>
        <div class="table__footer-cell">${{ (reports.reduce((sum, current) => sum + current.totalPrice, 0) / reports.length).toLocaleString('en-CA') }}</div>
        <div class="table__footer-cell">${{ reports.reduce((sum, current) => sum + current.totalProfit, 0).toLocaleString('en-CA') }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../ReportHeader'

export default {
  name: 'Profit',
  components: {Header},
  computed: {
    ...mapState({
      reports: s => s.reports.profit
    })
    // avarageJobEfficiency() {
    //   return (this.reports.reduce((sum, current) => sum + current.jobEfficiency, 0) / this.reports.length).toFixed(2)
    // }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
