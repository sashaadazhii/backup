<template>
  <div class="calendar__wrapper">
    <div class="calendar__title" ref="calendarTitle" @click="openClose">
      {{ dayjs(activeDay).format('MMMM YYYY') }}
    </div>
    <div v-if="isOpen" class="calendar__body" ref="calendarBody" @click.stop>
      <div class="calendar__body-year">
        <i class="ri-arrow-left-s-line" @click="subtractYear" />
        <span>{{ dayjs(viewYear).format('YYYY') }}</span>
        <i class="ri-arrow-right-s-line" @click="addYear" />
      </div>
      <div class="calendar__body-months">
        <div
          v-for="(month, idx) of months"
          :key="idx"
          class="calendar__body-month"
          :class="{active: dayjs(activeDay).format('MM YY') === dayjs(month).format('MM YY')}"
          @click="selectMonth(month)"
        >
          {{ dayjs(month).format('MMM') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'TheCalendar',
  props: {
    day: {
      type: Object,
      default: null
    }
  },
  emits: {
    'update:day': null
  },
  data() {
    return {
      dayjs: dayjs,
      isOpen: false,
      activeDay: dayjs(),
      viewYear: dayjs(),
      months: []
    }
  },
  created() {
    for (let i = 0; i < 12; i++) {
      this.months.push(dayjs().month(i))
    }
  },
  watch: {
    day(d) {
      this.activeDay = dayjs(d)
    }
  },
  methods: {
    openClose() {
      const closeListerner = e => {
        if (this.catchOutsideClick(e, this.$refs.calendarTitle)) {
          window.removeEventListener('click', closeListerner)
          this.isOpen = false
        }
      }
      window.addEventListener('click', closeListerner)
      this.isOpen = !this.isOpen
    },
    catchOutsideClick(event, dropdown) {
      if (dropdown == event.target) return false
      if (this.isOpen && dropdown != event.target) return true
    },
    selectMonth(month) {
      this.activeDay = dayjs(month)
      this.openClose()
      this.$emit('update:day', this.activeDay)
    },
    addYear() {
      this.viewYear = dayjs(this.viewYear).add(1, 'year')
      this.months = []
      for (let i = 0; i < 12; i++) {
        this.months.push(dayjs(this.viewYear).month(i))
      }
    },
    subtractYear() {
      this.viewYear = dayjs(this.viewYear).subtract(1, 'year')
      this.months = []
      for (let i = 0; i < 12; i++) {
        this.months.push(dayjs(this.viewYear).month(i))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
