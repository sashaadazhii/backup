<template>
  <div class="calendar__wrapper">
    <div class="calendar__header header">
      <div class="header__info hours">
        <div class="hours__label">
          <div class="hours__icon -bluegreen" />
          <div class="hours__name">Working hours:</div>
          <div class="hours__num">168 h</div>
        </div>
        <div class="hours__label">
          <div class="hours__icon -orange" />
          <div class="hours__name">Vacation days:</div>
          <div class="hours__num">12 d</div>
        </div>
        <div class="hours__label">
          <div class="hours__icon -blue" />
          <div class="hours__name">Sick days:</div>
          <div class="hours__num">120 h</div>
        </div>
      </div>
      <div class="header__top">
        <div class="header__top-left">
          <Dropdown v-model="month" :options="months" @change="changeMonth" size="medium" />
          <Dropdown v-model="year" :options="years" @change="changeYear" size="medium" />
        </div>
        <div class="header__top-right">
          <Button icon="i-add_circle" label="New Activity" />
        </div>
      </div>
      <div class="header__bottom" ref="header" @wheel="scrollHeader">
        <div v-for="(day, idx) of days" :key="idx" class="header__day" :class="{'-weekend': day.weekend}">
          <span>{{ day.name }}</span>
          <span>{{ day.number }}</span>
        </div>
      </div>
    </div>
    <div class="calendar__inner">
      <div class="calendar__sidebar">
        <div v-for="(tech, idx) of techs" :key="idx" class="calendar__tech tech">
          <Label :alias="tech.info.alias" circle size="small" class="tech__label" />
          <div class="tech__name">{{ tech.info.name }}</div>
          <i class="i-remove_red_eye tech__icon" />
        </div>
      </div>
      <div class="calendar__body" ref="body" id="body" @scroll="scrollBody">
        <div v-for="({days}, idx) of techs" :key="idx" class="calendar__row">
          <div
            v-for="(day, idx) of days"
            :key="idx"
            class="calendar__day day"
            :class="{day__work: day.work, day__vacation: day.vacation, day__sick: day.sick}"
            :style="{width: day.length * 46 + 16 * (day.length - 1) + 'px', width: day.length * 46 + 16 * (day.length - 1) + 'px',}"
            @click="open($event, day)"
          >
            <div class="day__inner">
              <span v-if="day.work">{{ day.hours }}</span>
              <span v-if="day.vacation && !day.length">V</span>
              <span v-if="day.vacation && day.length">Vacation</span>
              <span v-if="day.sick && !day.length">S</span>
              <span v-if="day.sick && day.length === 2">Sick</span>
              <span v-if="day.sick && day.length > 2">Sick Leaves</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Popup v-model:visible="display" :targetElement="target" :day="activeDay" @changeDay="changeDay" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Label from '@/components/Yaro/Label'
import Dropdown from '@/components/Yaro/Dropdown'
import Button from '@/components/Yaro/Button'

import Popup from './Popup'
export default {
  name: 'WorkOrderCalendar',
  components: {Label, Popup, Dropdown, Button},
  data() {
    return {
      display: false,
      target: null,
      activeDay: null,
      days: [],
      techs: [
        {
          info: {
            name: 'Leroy Martin',
            alias: 'LM',
            uid: this.$getID()
          },
          days: [
            {
              work: true,
              hours: 8,
              vacation: false
            },
            {
              vacation: true,
              length: 4
            },
            {
              work: true,
              hours: 8
            },
            {
              vacation: true
            },
            {
              work: true,
              hours: 8
            },
            {
              work: true,
              hours: 8
            },
            {
              vacation: true,
              length: 2
            },
            {
              sick: true,
              length: 2
            },
            {},
            {},
            {},
            {},
            {},
            {
              vacation: true,
              length: 8
            },
            {},
            {},
            {},
            {},
            {}
          ]
        }
      ],
      month: 'August',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      year: 2022,
      years: ['2022', '2023']
    }
  },
  created() {
    this.createCalendar()
    this.createTechs()
    this.createTechs()
    this.createTechs()
    this.createTechs()
    this.createTechs()
    this.createTechs()
    this.createTechs()
    this.createTechs()
    this.createTechs()
    this.createTechs()
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
    createTechs(name = 'Leroy Martin') {
      const uid = this.$getID()
      const tech = {
        info: {
          name,
          uid,
          alias: 'LM'
        },
        days: this.createDays(uid)
      }
      this.techs.push(tech)
    },
    createDays(uid = 0, month = '08') {
      const daysInMonth = dayjs().daysInMonth()
      const days = []
      for (let i = 1; i <= daysInMonth; i++) {
        const day = {
          date: dayjs().date(i),
          work: false,
          vakation: false,
          sick: false,
          length: 0,
          hours: 0,
          uid,
          id: this.$getID()
        }
        days.push(day)
      }
      return days
    },
    formatDays(arr) {
      const days = []
      arr.forEach((day, idx, arr) => {
        const nextDay = arr[idx + 1]
        const prevDay = arr[idx - 1]
        if (day.work) {
          days.push(day)
          return
        }
        if (day.vacation && !nextDay?.vacation && !prevDay?.vacation) {
          days.push(day)
          return
        }
        if (day.vacation && nextDay?.vacation) {
          nextDay.length = day.length + 1 || 1
          return
        }
        if (day.vacation && !nextDay?.vacation && prevDay?.vacation) {
          day.length += 1
          days.push(day)
          return
        }
        if (day.sick && !nextDay?.sick && !prevDay?.sick) {
          days.push(day)
          return
        }
        if (day.sick && nextDay?.sick) {
          nextDay.length = day.length + 1 || 1
          return
        }
        if (day.sick && !nextDay?.sick && prevDay?.sick) {
          day.length += 1
          days.push(day)
          return
        }
        days.push(day)
      })
      return days
    },

    scrollBody(e) {
      const header = this.$refs.header
      header.scrollLeft = e.target.scrollLeft
    },
    scrollHeader(e) {
      console.log(e.deltaX)
      const body = this.$refs.body
      body.scrollLeft = body.scrollLeft + e.deltaX
    },
    open(e, day) {
      this.target = e.target
      this.display = true
      this.activeDay = day
    },

    changeDay(day) {
      const tech = this.techs.find(t => t.info.uid === day.uid)
      const days = tech.days
      const dayIdx = days.findIndex(d => d.id === day.id)
      days.splice(dayIdx, 1, day)
      tech.days = this.formatDays(days)
    },
    changeMonth() {},
    changeYear() {}
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
