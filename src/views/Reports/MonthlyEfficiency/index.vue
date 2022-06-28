<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Date</div>
        <div class="table__header-title">Available Time</div>
        <div class="table__header-title">Hours on a Job</div>
        <div class="table__header-title">Idle Time</div>
        <div class="table__header-title">Time on Job</div>
        <div class="table__header-title">Job Efficiency</div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon">
            <i class="i-calendar" />
            {{ report.date }}
          </div>
          <div class="table__cell">
            {{ report.availableTime }}
          </div>
          <div class="table__cell">
            {{ report.hoursOnJob.toFixed(2) }}
          </div>
          <div class="table__cell">{{ report.idleTime.toFixed(2) }}</div>
          <div class="table__cell">{{ report.timeOnJob.toFixed(2) }}%</div>
          <div
            class="table__cell"
            :class="{
              'table__cell--red': report.jobEfficiency <= 50,
              'table__cell--orange': report.jobEfficiency >= 50 && report.jobEfficiency <= 70,
              'table__cell--green': report.jobEfficiency > 70
            }"
          >
            {{ report.jobEfficiency.toFixed() }}%
          </div>
        </div>
      </div>
      <div class="table__footer">
        <div class="table__footer-cell">Total:</div>
        <div class="table__footer-cell">{{ reports.reduce((sum, current) => sum + current.availableTime, 0).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.hoursOnJob, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.idleTime, 0) / reports.length).toFixed(2) }}</div>
        <div class="table__footer-cell">{{ (reports.reduce((sum, current) => sum + current.timeOnJob, 0) / reports.length).toFixed(2) }}%</div>
        <div
          class="table__footer-cell"
          :class="{
            'table__footer-cell--red': avarageJobEfficiency <= 50,
            'table__footer-cell--orange': avarageJobEfficiency >= 50 && avarageJobEfficiency <= 70,
            'table__footer-cell--green': avarageJobEfficiency > 70
          }"
        >
          {{ avarageJobEfficiency }}%
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../ReportHeader'

export default {
  name: 'MonthlyEfficiency',
  components: {Header},
  computed: {
    ...mapState({
      reports: s => s.reports.monthlyEfficiency
    }),
    avarageJobEfficiency() {
      return this.reports.reduce((sum, current) => sum + current.jobEfficiency, 0) / this.reports.length
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
