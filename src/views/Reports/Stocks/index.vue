<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Mark Up</div>
        <div class="table__header-title">Decription</div>
        <div class="table__header-title">On Hand</div>
        <div class="table__header-title">Cost</div>
        <div class="table__header-title">Price</div>
        <div class="table__header-title">Gross Profit</div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell">
            {{ report.markUp }}
          </div>
          <div class="table__cell">{{ report.description }}</div>
          <div class="table__cell">{{ report.onHand }}</div>
          <div class="table__cell">{{ formatter(report.cost) }}</div>
          <div class="table__cell">{{ formatter(report.price) }}</div>
          <div class="table__cell">{{ report.grossProfit.toFixed(2) }}%</div>
        </div>
      </div>
      <div class="table__footer">
        <div class="table__footer-cell">Total:</div>
        <div class="table__footer-cell"></div>
        <div class="table__footer-cell">{{ formatter(reports.reduce((sum, current) => sum + current.onHand, 0)) }}</div>
        <div class="table__footer-cell">{{ formatter(reports.reduce((sum, current) => sum + current.cost, 0)) }}</div>
        <div class="table__footer-cell">{{ formatter(reports.reduce((sum, current) => sum + current.price, 0) / reports.length) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.grossProfit, 0) / reports.length).toFixed(2) }}%</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../ReportHeader'

export default {
  name: 'Stocks',
  components: {Header},
  computed: {
    ...mapState({
      reports: s => s.reports.stocks
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
