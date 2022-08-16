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
      <div class="header__bottom" ref="header" @wheel="scrollHeader">
        <div v-for="(day, idx) of days" :key="idx" class="header__day" :class="{'-weekend': day.weekend}">
          <span>{{ day.number }}</span>
          <span>{{ day.name }}</span>
        </div>
      </div>
    </div>
    <div class="calendar__inner">
      <div class="calendar__body" ref="body" id="body" @scroll="scrollBody">
        <div class="calendar__row -top">
          <div class="calendar__tech"></div>
          <div class="calendar__days">
            <div class="calendar__day" v-for="(day, idx) of days" :key="idx">
              <span>{{ day.number }}</span>
              <span>{{ day.name }}</span>
            </div>
          </div>
        </div>
        <div class="calendar__row">
          <div class="calendar__tech">Leroy Martin</div>
          <div class="calendar__days">
            <div class="calendar__day" v-for="(day, idx) of days" :key="idx">
              <span>{{ day.number }}</span>
              <span>{{ day.name }}</span>
            </div>
          </div>
        </div>
        <div class="calendar__row">
          <div class="calendar__tech">Leroy Martin</div>
          <div class="calendar__days">
            <div class="calendar__day" v-for="(day, idx) of days" :key="idx">
              <span>{{ day.number }}</span>
              <span>{{ day.name }}</span>
            </div>
          </div>
        </div>
        <div class="calendar__row">
          <div class="calendar__tech">Leroy Martin</div>
          <div class="calendar__days">
            <div class="calendar__day" v-for="(day, idx) of days" :key="idx">
              <span>{{ day.number }}</span>
              <span>{{ day.name }}</span>
            </div>
          </div>
        </div>
        <div class="calendar__row">
          <div class="calendar__tech">Leroy Martin</div>
          <div class="calendar__days">
            <div class="calendar__day" v-for="(day, idx) of days" :key="idx">
              <span>{{ day.number }}</span>
              <span>{{ day.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import _ from 'lodash'

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
    },
    scrollBody(e) {
      const header = this.$refs.header
      header.scrollLeft = e.target.scrollLeft
    },
    scrollHeader(e) {
      console.log(e.deltaX)
      const body = this.$refs.body
      body.scrollLeft = body.scrollLeft + e.deltaX
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
