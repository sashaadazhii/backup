<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Technician</div>
        <div class="table__header-title">Hours worked</div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell">{{ report.technician }}</div>
          <div class="table__cell">{{ report.hoursWorked.toFixed(1) }} hrs</div>
        </div>
      </div>
      <div class="table__footer">
        <div class="table__footer-cell">Average:</div>
        <div class="table__footer-cell">{{ reports.reduce((sum, current) => sum + current.hoursWorked, 0).toFixed(1) }} hrs</div>
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
      reports: s => s.reports.payrollHours
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
