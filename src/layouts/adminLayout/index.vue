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
import HeaderCapacity from '@/views/CapacityCalendar/Header'
import TheSidebar from '@/components/Sidebar'

export default {
  name: 'adminLayout',
  components: {HeaderBoard, TheSidebar, HeaderStaff, HeaderCapacity},
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
