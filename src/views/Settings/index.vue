<template>
  <div class="page-inner">
    <TheHeader />
    <div class="settings__wrapper">
      <div class="settings__nav">
        <Nav :list="navList" />
      </div>
      <div class="settings__inner"><router-view /></div>
    </div>
  </div>
</template>
<script>
import TheHeader from './TheHeader'
import Nav from '@/components/Yaro/Navigation'
import {mapState} from 'vuex'

export default {
  name: 'CompanySettings',
  components: {TheHeader, Nav},
  data() {
    return {
      isLoading: false,
      navList: [
        {
          icon: 'i-home',
          label: 'General Info',
          to: '/settings/general'
        },
        {
          icon: 'i-group',
          label: 'Employees',
          to: '/settings/employees'
        },
        {
          icon: 'i-fiber_smart_record',
          label: 'Statuses',
          to: '/settings/statuses'
        },
        {
          icon: 'i-construction',
          label: 'Services',
          to: '/settings/services'
        }
      ]
    }
  },
  async created() {
    // const hasShifts = this.info.hasShifts
    // if (hasShifts) this.addShiftsPage()
    // else this.navList.splice(2, 1)
  },
  // watch: {
  //   'info.hasShifts'(hasShifts) {
  //     if (hasShifts) this.addShiftsPage()
  //     else this.navList.splice(2, 1)
  //   }
  // },
  computed: {
    ...mapState({
      info: s => s.company.settings.settings
    })
  },
  methods: {
    addShiftsPage() {
      const shiftPage = {
        icon: 'i-view_stream',
        label: 'Shifts',
        to: '/settings/shifts'
      }
      this.navList.splice(2, 0, shiftPage)
    },
    removeShiftsPage() {
      this.navList.splice(2, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
