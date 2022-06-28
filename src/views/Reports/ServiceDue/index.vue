<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Due Date</div>
        <div class="table__header-title">Due KM</div>
        <div class="table__header-title">Customer</div>
        <div class="table__header-title">Vehicle</div>
        <div class="table__header-title">Service</div>
        <div class="table__header-title">Callback</div>
        <div class="table__header-title"></div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon">
            <i class="i-calendar" />
            {{ report.dueDate }}
          </div>
          <div class="table__cell">
            {{ report.dueKM }}
          </div>
          <div class="table__cell table__cell--icon">
            <i class="i-customers" />
            {{ report.customer }}
          </div>
          <div class="table__cell table__cell--icon"><i class="i-directions_car" /> {{ report.vehicle }}</div>
          <div class="table__cell">{{ report.service }}</div>

          <div v-if="report.callback !== ''" class="table__cell table__cell--icon table__cell--icon--green"><i class="i-calendar" />{{ report.callback }}</div>
          <div v-else class="table__cell">
            <div class="label">
              <div class="label__icon"><i class="i-calendar" /></div>
              <div class="label__text">Set Date</div>
            </div>
          </div>
          <div v-if="report.note !== ''" class="table__cell">{{ report.note }}</div>
          <div v-else class="table__cell table__cell--icon table__cell--label">
            <div class="label label--dark">
              <div class="label__icon"><i class="i-add_circle" /></div>
              <div class="label__text">Add Note</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../ReportHeader'

export default {
  name: 'ServiceDue',
  components: {Header},
  computed: {
    ...mapState({
      reports: s => s.reports.serviceDue
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
