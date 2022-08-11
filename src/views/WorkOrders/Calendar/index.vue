<template>
  <div class="calendar__wrapper">
    <div class="calendar__header header">
      <div class="header__search"></div>
      <div class="header__top">
        <div class="header__top-left">
          <div class="header__year">2022</div>
        </div>
        <div class="header__top-right">
          <div class="header__month">Jan</div>
          <div class="header__month -active">Feb</div>
        </div>
      </div>
      <div class="header__bottom">
        <div v-for="(day, idx) of days" :key="idx" class="header__day" :class="{'-weekend': day.weekend}">
          <span>{{day.number}}</span>
          <span>{{day.name}}</span>
        </div>
      </div>
    </div>
    <div class="calendar__inner"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'WorkOrderCalendar',
  data() {
    return {
      days: []
    }
  },
  created() {
    this.createCalendar()
  },
  methods: {
    createCalendar(month = '08') {
      const daysLength = dayjs().daysInMonth()
      for (let i = 1; i <= daysLength; i++) {
        const day = {
          number: dayjs(month).date(i).format('D'),
          name: dayjs().date(i).format('dd')[0],
          weekend: dayjs().date(i).format('d') === '0' || dayjs().date(i).format('d') === '6'
        }
        this.days.push(day)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
