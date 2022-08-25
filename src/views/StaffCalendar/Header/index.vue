<template>
  <div class="header__wrapper">
    <div class="header__inner" :class="{'-open': sidebarOpen}">
      <div class="header__icon"><i class="i-calendar"></i></div>
      <div class="header__title">Staff Time Scheduler</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'StaffCalendarHeader',
  computed: {
    ...mapState({
      sidebarOpen: s => s.modules.sidebarOpen
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
