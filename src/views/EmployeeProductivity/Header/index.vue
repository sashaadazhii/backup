<template>
  <div class="header__wrapper">
    <div class="header__inner" :class="{'-open': sidebarOpen}">
      <div class="header__icon"><i class="i-timelapse"></i></div>
      <div class="header__title">Employee Productivity</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'WorkBoardHeader',
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
