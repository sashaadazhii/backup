<template>
  <div class="header__wrapper">
    <div class="header__inner" :class="{'-open': sidebarOpen}">
      <div class="header__left">
        <div class="header__icon"><i class="i-dashboard"></i></div>
        <div class="header__title">Work Board</div>
      </div>
      <div class="header__right">
        <router-link to="/work-order/new"><Button icon="i-add_circle" label="New Work Order" circle size="small" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Button from '@/components/Yaro/Button'

export default {
  name: 'WorkBoardHeader',
  components: {Button},
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
