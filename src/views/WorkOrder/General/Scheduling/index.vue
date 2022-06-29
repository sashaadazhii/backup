<template>
  <div class="block__wrapper">
    <div class="block__title">Scheduling</div>
    <div class="block__inner">
      <DatePicker
        v-model="date"

        :popover="{visibility: 'focus'}"
        locale="en"
        :masks="{input: 'DD MMM YYYY'}"
      >
        <template v-slot="{inputValue, inputEvents}">
          <Input :modelValue="`${inputValue}`" v-on="inputEvents" title="Job date" iconLeft="i-timer orange" placeholder="Choose date" />
        </template>
      </DatePicker>

      <Dropdown v-model="technitian" :options="technitianList" title="Choose Shift">
        <template #value="{value}">
          <div class="y-dropdown-label-custom">
            <i class="i-fire" />
            <span v-if="value">{{ value }}</span>
            <span v-else class="-placeholder">Choose Shift</span>
          </div>
        </template>
        <template #option="{option}">
          <div class="y-dropdown-item-custom">
            <i class="i-fire" />
            <span>{{ option }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import {DatePicker} from 'v-calendar'
import Input from '@/components/Yaro/Input'
import Dropdown from '@/components/Yaro/Dropdown'

export default {
  name: 'WorkOrderGeneralScheduling',
  components: {DatePicker, Input, Dropdown},
  data() {
    return {
      date: null,
      technitian: null,
      serviceAdvisor: null,
      technitianList: ['Day', 'Night', 'Over']
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
