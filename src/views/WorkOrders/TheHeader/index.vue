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
        <button class="header__btn" @click="openModal">
          <i class="i-add_circle" />
          <span>Add Work Order</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AddWorkOrder from '../AddWorkOrder'

export default {
  name: 'WorkBoardHeader',
  methods: {
    openModal() {
      this.$vfm.show({
        component: AddWorkOrder,
        bind: {
          name: 'AddWorkOrder'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
