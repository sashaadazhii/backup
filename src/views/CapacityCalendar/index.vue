<template>
  <div class="calendar__wrapper">
    <div class="calendar__inner">
      <div class="calendar__header">
        <Dropdown v-model="month" :options="months" @change="changeMonth" size="medium">
          <template #option="{option}">
            <div class="y-dropdown-item-custom">
              <span>{{ option.name }}</span>
            </div>
          </template>
          <template #value="{value}">
            <div class="y-dropdown-label-custom">
              <span>{{ value.name }}</span>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="calendar__titles">
        <div class="calendar__title">Monday</div>
        <div class="calendar__title">Tuesday</div>
        <div class="calendar__title">Wednesday</div>
        <div class="calendar__title">Thursday</div>
        <div class="calendar__title">Friday</div>
        <div class="calendar__title">Saturday</div>
        <div class="calendar__title">Sunday</div>
      </div>
      <div class="calendar__list">
        <div v-for="(day, idx) of days" :key="idx" class="calendar__slot day">
          <div v-if="day?.num" class="day__num" :class="{'day__num--active': day.date.format('DD MM YYYY') === dayjs().format('DD MM YYYY')}">
            {{ day.num }}
          </div>
          <div v-if="day?.shifts" class="day__shifts">
            <div v-for="(shift, idx) of day.shifts" :key="idx" class="day__shift shift">
              <div class="shift__header">
                <div class="shift__name">{{ shift.name }}</div>
              </div>
              <div class="shift__capacity"><span :class="capacityColor(shift.capacity)" :style="{width: shift.capacity + '%'}" /></div>
              <div class="shift__body">{{ shift.hours }}h out of {{ shift.allHours }}h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Dropdown from '@/components/Yaro/Dropdown'

export default {
  name: 'CapacityCalendar',
  components: {Dropdown},
  data() {
    return {
      dayjs,
      days: [],
      month: {id: 7, name: 'August'},
      months: [
        {id: 0, name: 'January'},
        {id: 1, name: 'February'},
        {id: 2, name: 'March'},
        {id: 3, name: 'April'},
        {id: 4, name: 'May'},
        {id: 5, name: 'June'},
        {id: 6, name: 'July'},
        {id: 7, name: 'August'},
        {id: 8, name: 'September'},
        {id: 9, name: 'October'},
        {id: 10, name: 'November'},
        {id: 11, name: 'December'}
      ]
    }
  },
  created() {
    this.createCalendar(this.month.id)
  },
  methods: {
    createCalendar(month = 7, year = 2022) {
      const daysLength = dayjs().year(year).month(month).daysInMonth()
      const startDay = dayjs().year(year).month(month).startOf('M').day()

      if (startDay === 0) this.days.length = 6
      else this.days.length = startDay - 1
      for (let i = 1; i <= daysLength; i++) {
        const day = {
          date: dayjs().year(year).month(month).date(i),
          num: i,
          shifts: [
            {
              name: 'Morning Shift',
              color: '#ff9b70',
              capacity: Math.floor(Math.random() * 101),
              hours: Math.floor(Math.random() * 8) + 1,
              allHours: Math.floor(Math.random() * 8) + 1
            },
            {
              name: 'Day Shift',
              color: '#ba8ae7',
              capacity: Math.floor(Math.random() * 101),
              hours: Math.floor(Math.random() * 8) + 1,
              allHours: Math.floor(Math.random() * 8) + 1
            },
            {
              name: 'Night Shift',
              color: '#3eb3bb',
              capacity: Math.floor(Math.random() * 101),
              hours: Math.floor(Math.random() * 8) + 1,
              allHours: Math.floor(Math.random() * 8) + 1
            }
          ]
        }
        this.days.push(day)
      }
    },
    changeMonth({value: month}) {
      this.days.length = 0
      this.createCalendar(month.id)
    },
    capacityColor(capacity) {
      if (capacity <= 50) return '-green'
      if (capacity <= 80) return '-orange'
      if (capacity <= 100) return '-red'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
