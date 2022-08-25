<template>
  <div class="header__wrapper">
    <div class="header__left">
      <Dropdown v-model="period" :options="periods" size="medium">
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <span class="-title">Time Period:</span>
            <span v-if="value">{{ value }} </span>
            <span v-else>All</span>
          </div>
        </template>
        <template #option="{option}">
          <div class="field__select-label">
            <span>{{ option }}</span>
          </div>
        </template>
      </Dropdown>
      <DatePicker v-if="period === 'Custom'" v-model="range" is-range class="field__label-wrap">
        <template v-slot="{inputValue, inputEvents}">
          <label class="field__label">
            <span class="field__placeholder">Date range:</span>
            <span class="field__input-wrap">
              <i class="i-calendar" />
              <input :value="formattedRange(inputValue)" v-on="inputEvents.start" class="field__input" />
              <span class="field__input-value">{{ formattedRange(inputValue) }}</span>
            </span>
          </label>
        </template>
      </DatePicker>
      <Dropdown v-model="sorted" :options="sortList" size="medium">
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <span class="-title">Display by:</span>
            <span v-if="value">{{ value }} </span>
            <span v-else>All</span>
          </div>
        </template>
        <template #option="{option}">
          <div class="field__select-label">
            <span>{{ option }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="header__right">
      <Button border grey icon="i-print" />
      <Button border grey icon="i-email" />
      <Button label="Export Report" border grey icon="i-save_alt" class="header__btn" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Dropdown from '@/components/Yaro/Dropdown'
import {Calendar, DatePicker} from 'v-calendar'
export default {
  name: 'ReportsHeader',
  components: {Button, Dropdown, DatePicker},
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date()
      },
      periods: ['3 days', 'Week', 'This month', '3 months', '6 months', 'Year', 'Custom'],
      period: 'This month',
      sortList: ['Day', 'Expense Account', 'Amount', 'HST'],
      sorted: 'Day'
    }
  },
  methods: {
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
