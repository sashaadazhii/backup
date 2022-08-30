<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <Dropdown v-model="shift" :options="shifts" size="medium">
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <span class="-title">Shifts:</span>
            <span>{{ value.name }} </span>
          </div>
        </template>
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <span>{{ option.name }}</span>
          </div>
        </template>
      </Dropdown>
      <Dropdown v-model="day" :options="days" size="medium" @change="changeDay">
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <span class="-title">Time Period:</span>
            <span>{{ value }} </span>
          </div>
        </template>
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <span>{{ option }}</span>
          </div>
        </template>
      </Dropdown>

      <DatePicker v-if="day === 'Custom'" v-model="date" locale="en-Ca" is-range>
        <template v-slot="{inputValue, inputEvents}">
          <label class="picker__wrap">
            <span>Date:</span>
            <i class="i-calendar" />
            <input :value="formattedRange(inputValue)" v-on="inputEvents.start" />
            <span class="picker__value">{{ formattedRange(inputValue) }}</span>
          </label>
        </template>
      </DatePicker>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Yaro/Dropdown'
import {mapActions, mapState, mapMutations} from 'vuex'
import {DatePicker} from 'v-calendar'
import dayjs from 'dayjs'

export default {
  name: 'WorkBoardTaskHeader',
  components: {DatePicker, Dropdown},
  data() {
    return {
      shift: {name: 'Day Shift'},
      date: {start: new Date(), end: new Date()},
      day: 'Today',
      days: ['Today', 'Three Days', 'Five Days', 'Custom']
    }
  },
  async created() {
    // const techsList = await this.searchUsers({role: 'technician'})
    // const technicians = {
    //   name: 'Technician',
    //   id: this.$getID(),
    //   mods: ['filter', 'multiple'],
    //   filterPlaceholder: 'Search Tech',
    //   list: techsList
    // }
    // this.filtersList.push(technicians)
  },
  computed: {
    ...mapState({
      shifts: s => s.company.shifts.shifts
    })
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
    formattedRange(range) {
      if (!range.start) return ''
      if (range.start === range.end) return `${range.start}`
      return `${range.start} ~ ${range.end}`
    },
    changeDay() {
      // const day = {type: this.day, date: this.date}
      // this.$emit('changeDay', day)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
