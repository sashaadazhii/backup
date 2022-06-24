<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Date</div>
        <div class="table__header-title">Sold Time</div>
        <div class="table__header-title">Capacity</div>
        <div class="table__header-title">Availability</div>
        <div class="table__header-title">Efficiency</div>
        <div class="table__header-title">Warranty</div>
        <div class="table__header-title">Discount</div>
        <div class="table__header-title">Effective Labour Rate</div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon">
            <i class="i-calendar" />
            {{ report.date }}
          </div>
          <div class="table__cell">{{ report.soldTime.toFixed(2) }}</div>
          <div class="table__cell">{{ report.capacity.toFixed(2) }}</div>
          <div class="table__cell">{{ report.availability.toFixed(2) }}</div>
          <div
            class="table__cell"
            :class="{
              'table__cell--red': report.efficiency <= 50,
              'table__cell--orange': report.efficiency >= 50 && report.efficiency <= 70,
              'table__cell--green': report.efficiency > 70
            }"
          >
            {{ report.efficiency.toFixed() }} %
          </div>
          <div class="table__cell">{{ report.warranty.toFixed(2) }}</div>
          <div class="table__cell">{{ report.discount.toFixed(2) }}</div>
          <div class="table__cell">{{ report.effectiveLabourRate.toFixed(2) }} / hr</div>
        </div>
      </div>
      <div class="table__footer">
        <div class="table__footer-cell">Total:</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.soldTime, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.capacity, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.availability, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.efficiency, 0) / reports.length).toFixed() }} %</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.warranty, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.discount, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.effectiveLabourRate, 0) / reports.length).toFixed(2) }} / hr</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../ReportHeader'

export default {
  name: 'ReportsSoldTime',
  components: {Header},
  computed: {
    ...mapState({
      reports: s => s.reports.soldTime
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
