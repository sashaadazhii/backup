<template>
  <div class="block__wrapper">
    <div class="block__title">main settings</div>
    <div class="block__row">
      <div class="block__cell">
        <i class="i-directions_car" />
        <span>Vehicle is at the shop</span>
      </div>
      <Switch v-model="vehicleInShop" />
    </div>
    <div class="block__row">
      <div class="block__cell">
        <i class="i-headset_mic" />
        <span>Talk to SA before start</span>
      </div>
      <Switch v-model="talkSA" />
    </div>
    <div class="block__row">
      <div class="block__cell">
        <i class="i-build" />
        <span>Parts ordered</span>
      </div>
      <Switch v-model="partsOrdered" />
    </div>
    <DatePicker
      v-model="timeComing"
      mode="dateTime"
      :minute-increment="5"
      :popover="{visibility: 'focus'}"
      locale="en"
      :masks="{inputDateTime: 'DD MMM YYYY hh:mm a'}"
    >
      <template v-slot="{inputValue, inputEvents}">
        <Input :modelValue="`${inputValue}`" v-on="inputEvents" title="Time coming *" iconLeft="i-timer orange" placeholder="Choose time & date" />
      </template>
    </DatePicker>
    <DatePicker
      v-model="timePromised"
      mode="dateTime"
      :minute-increment="5"

      locale="en"
      :masks="{inputDateTime: 'DD MMM YYYY hh:mm a'}"
    >
      <template v-slot="{inputValue, inputEvents}">
        <Input :modelValue="`${inputValue}`" v-on="inputEvents" title="Time promised" iconLeft="i-timer green" placeholder="Choose time & date" />
      </template>
    </DatePicker>
    <Dropdown v-model="technitian" :options="technitianList" title="Responsible Technician">
      <template #value="{value}">
        <div class="y-dropdown-label-custom">
          <i class="i-user1 green" />
          <span v-if="value">{{ value }}</span>
          <span v-else class="-placeholder">Choose Technitian</span>
        </div>
      </template>
      <template #option="{option}">
        <div class="y-dropdown-item-custom">
          <i class="i-work_order green" />
          <span>{{ option }}</span>
        </div>
      </template>
    </Dropdown>
    <Dropdown v-model="serviceAdvisor" :options="technitianList" title="Responsible Service Advisor">
      <template #value="{value}">
        <div class="y-dropdown-label-custom">
          <i class="i-user1 blue" />
          <span v-if="value">{{ value }}</span>
          <span v-else class="-placeholder">Choose Service Advisor</span>
        </div>
      </template>
      <template #option="{option}">
        <div class="y-dropdown-item-custom">
          <i class="i-work_order blue" />
          <span>{{ option }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import Switch from '@/components/Yaro/Switch'
import {DatePicker} from 'v-calendar'
import Input from '@/components/Yaro/Input'
import Dropdown from '@/components/Yaro/Dropdown'

export default {
  name: 'WorkOrderGeneralSettings',
  components: {Switch, DatePicker, Input, Dropdown},
  data() {
    return {
      vehicleInShop: false,
      talkSA: false,
      partsOrdered: false,
      timeComing: null,
      timePromised: null,
      technitian: null,
      serviceAdvisor: null,
      technitianList: ['Bret', 'Olaf', 'Marko']
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
