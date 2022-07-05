<template>
  <div class="statuses__wrapper">
    <div class="statuses__container">
      <div class="statuses__header">
        <div class="statuses__header-title">Statuses</div>
        <div class="statuses__header-subtitle">Add as many statuses to each of the major phases of a work order.</div>
      </div>
      <div class="statuses__main">
        <Status v-for="status of logicalStatuses" :key="status.uid" :status="status" />
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Status from './Slot'

export default {
  name: 'CompanySettingsStatuses',
  components: {Status},
  data() {
    return {
      isLoading: false
    }
  },
  async created() {
    try {
      this.isLoading = true
      if (!this.statuses.length) await this.fetch()
    } finally {
      this.isLoading = false
    }
    this.logicalStatuses.forEach(logStat => {
      const statuses = this.statuses.filter(st => st.logicalStatus === logStat.status)
      logStat.substatuses = statuses
    })
  },
  computed: {
    ...mapState({
      statuses: s => s.workOrder.status.statuses,
      logicalStatuses: s => s.workOrder.status.logicalStatuses
    })
  },
  watch: {},
  methods: {
    ...mapActions({
      fetch: 'workOrder/status/fetch'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
