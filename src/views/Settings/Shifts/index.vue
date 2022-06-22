<template>
  <div class="shifts__wrapper">
    <div class="shifts__header">
      <div class="shifts__header-title">
        <span>Shifts</span>
        <router-link to="/settings/shifts/new"><Button label="Add New" icon="i-add_circle" circle size="small" /></router-link>
      </div>
      <div class="shifts__header-subtitle">The company must have at least one shift</div>
    </div>
    <div class="shifts__main">
      <Shift v-for="shift of shifts" :key="shift.uid" :shift="shift" />
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Button from '@/components/Yaro/Button'
import Shift from './Slot'

export default {
  name: 'CompanySettingsStatuses',
  components: {Button, Shift},
  data() {
    return {
      isLoading: false
    }
  },
  async created() {
    try {
      this.isLoading = true
      if (!this.shifts.length) await this.fetch()
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapState({
      shifts: s => s.company.shifts.shifts
    })
  },
  watch: {},
  methods: {
    ...mapActions({
      fetch: 'company/shifts/fetch'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
