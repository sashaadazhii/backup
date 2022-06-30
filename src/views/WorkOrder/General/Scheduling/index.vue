<template>
  <div class="block__wrapper">
    <div class="block__title">Scheduling</div>
    <div class="block__inner">
      <DatePicker v-model="date" :popover="{visibility: 'focus', positionFixed: true}" locale="en" :masks="{input: 'DD MMM YYYY'}">
        <template v-slot="{inputValue, inputEvents}">
          <Input :modelValue="`${inputValue}`" v-on="inputEvents" title="Job date" iconLeft="i-timer orange" placeholder="Choose date" />
        </template>
      </DatePicker>
      <Dropdown v-model="shift" :options="shiftsList" title="Choose Shift">
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
      <button v-ripple class="block__btn" @click="open">
        <i class="i-add_circle" />
        <span>Add Day</span>
      </button>
    </div>
    <Dialog v-model:visible="display">
      <div class="dialog__inner">
        <div class="dialog__header">
          <div class="dialog__header-top">
            <div class="dialog__title">Multi-day Job Scheduling</div>
            <button class="dialog__close" @click="close"><i class="i-circle_close" /></button>
          </div>
          <div class="dialog__header-bottom">
            <div class="dialog__header-label">
              <i class="i-time" />
              <span><span>12h </span>Total job hours</span>
            </div>
          </div>
        </div>
        <div class="dialog__main">
          <div class="day__list">
            <div v-for="(day, idx) of localDays" :key="idx" class="day__item">
              <div class="day__header" :class="{'day__header--close': localDays.length > 1}">
                <div class="day__header-title">Day {{ idx + 1 }}</div>
                <div class="day__header-line" />
                <button v-if="localDays.length > 1" class="day__header-close" @click="remove(idx)"><i class="i-remove_circle_outline" /></button>
              </div>
              <div class="day__main">
                <DatePicker v-model="day.date" :popover="{visibility: 'focus', positionFixed: true}" locale="en" :masks="{input: 'DD MMM YYYY'}">
                  <template v-slot="{inputValue, inputEvents}">
                    <Input :modelValue="`${inputValue}`" v-on="inputEvents" title="Date" iconLeft="i-timer orange" placeholder="Choose date" />
                  </template>
                </DatePicker>
                <Dropdown v-model="day.shift" :options="shiftsList" title="Shift">
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
                <!-- TODO: Field Number Component -->
                <div class="y-number__wrapper">
                  <div class="y-number__title">Allowed Time</div>
                  <div class="y-number__inner">
                    <i class="i-remove y-number__dec" :class="{'-disabled': !day.time}" @click="dec(idx)" />
                    <span class="y-number__text">{{ day.time }} h</span>
                    <i class="i-add y-number__inc" @click="inc(idx)" />
                  </div>
                </div>
                <!-- TODO: Field Number Component -->
              </div>
            </div>
          </div>
          <button class="day__btn" @click="add">
            <i class="i-add_circle" />
            <span>Add another day</span>
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import {DatePicker} from 'v-calendar'
import Input from '@/components/Yaro/Input'
import Dropdown from '@/components/Yaro/Dropdown'
import Dialog from '@/components/Yaro/Dialog'

import Ripple from '@/components/Yaro/ripple'

export default {
  name: 'WorkOrderGeneralScheduling',
  components: {DatePicker, Input, Dropdown, Dialog},
  data() {
    return {
      date: null,
      shift: null,
      shiftsList: ['Day', 'Night', 'Over'],
      display: false,
      days: [],
      localDays: [{date: null, shift: null, time: 0}]
    }
  },
  methods: {
    open() {
      this.display = true
    },
    close() {
      this.display = false
    },
    // TODO: Field Number Component
    dec(idx) {
      if (!this.localDays[idx].time) return
      this.localDays[idx].time -= 0.5
    },
    inc(idx) {
      this.localDays[idx].time += 0.5
    },
    // TODO: Field Number Component
    add() {
      const day = {date: null, shift: null, time: 0}
      this.localDays.push(day)
    },
    remove(idx) {
      this.localDays.splice(idx, 1)
    }
  },
  directives: {
    ripple: Ripple
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
