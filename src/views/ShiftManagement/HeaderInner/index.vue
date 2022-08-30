<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <Dropdown v-model="day" :options="days" size="medium">
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

export default {
  name: 'WorkBoardTaskHeader',
  components: {DatePicker, Dropdown},
  data() {
    return {
      date: {start: new Date(), end: new Date()},
      day: 'Today',
      days: ['Today', 'Three Days', 'Five Days', 'Custom']
    }
  },

  computed: {
    ...mapState({})
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
    formattedRange(range) {
      if (!range.start) return ''
      if (range.start === range.end) return `${range.start}`
      return `${range.start} ~ ${range.end}`
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
