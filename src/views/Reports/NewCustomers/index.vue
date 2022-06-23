<template>
  <div class="reports__inner">
    <Header />
    <div class="table table__wrapper">
      <div class="table__header">
        <div class="table__header-title">Date added</div>
        <div class="table__header-title">First & Last Name</div>
        <div class="table__header-title">Phone</div>
        <div class="table__header-title">Last job date</div>
        <div class="table__header-title">Reffered by</div>
      </div>
      <div class="table__main">
        <div v-for="(report, idx) of reports" :key="idx" class="table__row">
          <div class="table__cell table__cell--icon table__cell--icon--bluegreen">
            <i class="i-calendar" />
            {{ report.dateAdded }}
          </div>
          <div class="table__cell table__cell--icon">
            <i class="i-customers" />
            {{ report.name }}
          </div>
          <div class="table__cell table__cell--icon table__cell--link">
            <a class="table__cell-link" :href="`tel:${report.phone}`"><i class="i-phone" /> {{ report.phone }}</a>
          </div>
          <div class="table__cell table__cell--icon table__cell--label">
            <Label class="table__cell-label" icon="i-calendar" :label="report.lastJobDate" border />
          </div>
          <div class="table__cell">
            {{ report.refferedBy }}
          </div>
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
  name: 'ReportsSoldTime',
  components: {Header, Label},
  created() {
    console.log(this.reports)
  },
  computed: {
    ...mapState({
      reports: s => s.reports.newCustomers
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
