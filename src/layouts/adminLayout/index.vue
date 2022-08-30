<template>
  <div class="admin-layout layout">
    <TheSidebar />
    <component :is="header" />
    <div class="page-wrapper" :class="{'admin-wrapper': headerName === 'admin', 'board-wrapper': headerName === 'board'}">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderBoard from '@/views/WorkOrders/TheHeader'
import HeaderStaff from '@/views/StaffCalendar/Header'
import HeaderPayroll from '@/views/PayrollOverview/Header'
import HeaderCapacity from '@/views/CapacityCalendar/Header'
import EmployeeProductivity from '@/views/EmployeeProductivity/Header'
import TheSidebar from '@/components/Sidebar'

export default {
  name: 'adminLayout',
  components: {HeaderBoard, TheSidebar, HeaderStaff, HeaderCapacity, HeaderPayroll},
  computed: {
    headerName() {
      return this.$route.meta.header
    },
    header() {
      switch (this.headerName) {
        case 'board':
          return HeaderBoard
        case 'staffCalendar':
          return HeaderStaff
        case 'capacityCalendar':
          return HeaderCapacity
        case 'payrollOverview':
          return HeaderPayroll
        case 'employeeProductivity':
          return EmployeeProductivity
        default:
          return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
