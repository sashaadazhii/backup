<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__bottom">
        <div class="header__left">
          <!--  -->
          <div class="toggle-wrap">
            <div class="toggle">
              <div class="toggle__icon" :class="{active: !viewCol}">
                <i class="i-calendar_today" @click="changeView(false)" />
              </div>
              <div class="toggle__icon" :class="{active: viewCol}">
                <i class="i-view_agenda" @click="changeView(true)" />
              </div>
            </div>
          </div>

          <Calendar :day="activeDay" @update:day="changeDay" />
          <div class="calendar-actions-wrap">
            <div class="calendar-actions">
              <i class="ri-arrow-left-s-line" @click="decDay" />
              <button class="btn btn--border" @click="selectToday">Today</button>
              <i class="ri-arrow-right-s-line" @click="incDay" />
            </div>
          </div>
        </div>
        <div class="header__center">
          <button class="btn btn--border">Shifts: All</button>
          <button class="btn btn--border">Status: All</button>
          <button class="btn btn--border">Technicians: All</button>
          <button class="btn btn--border">Service Advisor: All</button>
        </div>
        <div class="header__right">
          <button class="ico-btn gear"><i class="ri-settings-3-fill"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/TheCalendar'
import dayjs from 'dayjs'

export default {
  name: 'CalendarHeader',
  components: {Calendar},
  props: {
    viewCol: {
      type: Boolean,
      default: false
    },
    activeDay: {
      type: Object,
      default: null
    }
  },
  emits: {
    changeView: null,
    changeDay: null
  },
  methods: {
    changeView(viewCol) {
      this.$emit('changeView', viewCol)
    },
    changeDay(day) {
      this.$emit('changeDay', {day})
    },
    selectToday() {
      this.$emit('changeDay', {day: dayjs()})
    },
    incDay() {
      this.$emit('changeDay', {day: dayjs(this.activeDay).add(1, 'day')})
    },
    decDay() {
      this.$emit('changeDay', {day: dayjs(this.activeDay).subtract(1, 'day')})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
