<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__left">
        <div class="header__icon"><i class="i-dashboard"></i></div>
        <div class="header__title">Work Board</div>
        <div class="header__nav">
          <!-- <router-link class="header__nav-link" to="/work-board/calendar">
            <i class="i-calendar_stroke" />
            <span>Calendar</span>
          </router-link>
          <router-link class="header__nav-link" to="/work-board/tasks">
            <i class="i-view_agenda" />
            <span>Tasks Board</span>
          </router-link> -->
        </div>
      </div>
      <div class="header__right">
        <router-link to="/work-order/new"><Button icon="i-add_circle" label="Add Work Order" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'

export default {
  name: 'WorkBoardHeader',
  components: {Button}
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
