<template>
  <div class="admin-layout layout">
    <TheSidebar />
    <HeaderBoard v-if="headerName === 'board'" />
    <HeaderStaff v-if="headerName === 'staffCalendar'" />
    <div class="page-wrapper" :class="{'admin-wrapper': headerName === 'admin', 'board-wrapper': headerName === 'board'}">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderBoard from '@/views/WorkOrders/TheHeader'
import HeaderStaff from '@/views/StaffCalendar/Header'
import TheSidebar from '@/components/Sidebar'

export default {
  name: 'adminLayout',
  components: {HeaderBoard, TheSidebar, HeaderStaff},
  computed: {
    headerName() {
      return this.$route.meta.header
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
