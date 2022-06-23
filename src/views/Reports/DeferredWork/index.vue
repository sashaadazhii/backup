<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Date</div>
        <div class="table__header-title">Customer</div>
        <div class="table__header-title">Vehicle</div>
        <div class="table__header-title">Declined</div>
        <div class="table__header-title">Warranty</div>
        <div class="table__header-title">Discount Time</div>
        <div class="table__header-title">Cost Total</div>
        <div class="table__header-title">Price Total</div>
        <div class="table__header-title">Profit Deferred</div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon table__cell--icon--bluegreen">
            <i class="i-calendar" />
            {{ report.date }}
          </div>
          <div class="table__cell table__cell--icon">
            <i class="i-customers" />
            {{ report.customer }}
          </div>
          <div class="table__cell table__cell--icon">
            <i class="i-directions_car" />
            {{ report.vehicle }}
          </div>
          <div class="table__cell table__cell--icon table__cell--label">
            <Label v-for="(card, idx) of report.declined" :key="idx" class="table__cell-label" icon="i-article_menu" :label="card.name" border />
          </div>
          <div class="table__cell">{{ report.warranty.toFixed(2) }}</div>
          <div class="table__cell">{{ report.discountTime.toFixed(2) }}</div>
          <div class="table__cell">$ {{ report.costTotal.toFixed(2) }}</div>
          <div class="table__cell">$ {{ report.priceTotal.toFixed(2) }}</div>
          <div class="table__cell">$ {{ report.profitDeferred.toLocaleString('fr-FR') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../ReportHeader'
import Label from '@/components/Yaro/Label'

export default {
  name: 'ReportsDeferredWork',
  components: {Header, Label},
  created() {
    console.log(this.reports)
  },
  computed: {
    ...mapState({
      reports: s => s.reports.deferredWork
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
