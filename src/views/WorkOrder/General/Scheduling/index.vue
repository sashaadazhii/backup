<template>
  <div class="block__wrapper">
    <div class="block__title">Scheduling</div>
    <div class="block__inner">
      <div class="block__header">
        <div class="block__header-title">Total hours/Planned</div>
        <div class="block__label">
          <span><i class="i-time green" />{{ order.schedulingTime?.all }}h</span>
          <span> / </span>
          <span v-if="order.schedulingTime?.all === order.schedulingTime?.planned"><i class="i-check_circle_outline green" />All</span>
          <span v-else class="-grey"><i class="i-time" />{{ order.schedulingTime?.planned }}h</span>
        </div>
      </div>
      <div v-if="order.scheduling" class="block__days">
        <div v-for="(day, idx) of order.scheduling" :key="idx" class="block__day-wrapper">
          <div class="block__day-title">Day {{ idx + 1 }}</div>
          <div class="block__day-inner">
            <div class="block__day-label">
              <div class="block__day-label-title">Date</div>
              <div class="block__day-label-text">
                <i class="i-calendar bluegreen" />
                <span>{{ dayjs(day.date).format('DD MMM YYYY') }}</span>
              </div>
            </div>
            <div class="block__day-label">
              <div class="block__day-label-title">Shift</div>
              <div class="block__day-label-text">
                <i class="i-fire purple" />
                <span>{{ day.shift?.name }}</span>
              </div>
            </div>
            <div class="block__day-label">
              <div class="block__day-label-title">Time</div>
              <div class="block__day-label-text">
                <i class="i-time orange" />
                <span>{{ day.time }}h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button v-ripple class="block__btn" @click="open">
        <i class="i-add_circle" />
        <span>Make a Schedule</span>
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
            <div class="dialog__header-label" :class="{active: schedulingTime.all === schedulingTime.planned}">
              <span>
                <i class="i-time green" /><span class="-green">{{ schedulingTime.all }}h </span>Total job hours
              </span>
              <span v-if="schedulingTime.planned && schedulingTime.all > schedulingTime.planned">
                <span class="-grey"> / </span> <i class="i-time orange" /> <span class="-orange">{{ schedulingTime.planned }}h </span>Planned
              </span>
              <span v-if="schedulingTime.all === schedulingTime.planned">
                <span class="-grey"> / </span>All Planned <i class="i-check_circle_outline green" />
              </span>
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
                <DatePicker v-model="day.date" locale="en-Ca">
                  <template v-slot="{inputValue, inputEvents}">
                    <Input :modelValue="`${inputValue}`" v-on="inputEvents" title="Date" iconLeft="i-timer orange" placeholder="Choose date" />
                  </template>
                </DatePicker>
                <Dropdown v-model="day.shift" :options="shifts" title="Shift">
                  <template #value="{value}">
                    <div class="y-dropdown-label-custom">
                      <i class="i-fire" />
                      <span v-if="value">{{ value.name }}</span>
                      <span v-else class="-placeholder">Choose Shift</span>
                    </div>
                  </template>
                  <template #option="{option}">
                    <div class="y-dropdown-item-custom">
                      <i class="i-fire" />
                      <span>{{ option.name }}</span>
                    </div>
                  </template>
                </Dropdown>
                <div class="y-number__wrapper">
                  <div class="y-number__title">Allowed Time</div>
                  <div class="y-number__inner">
                    <i class="i-remove y-number__dec" :class="{'-disabled': !day.time}" @click="dec(idx)" />
                    <span class="y-number__text">{{ day.time }} h</span>
                    <i class="i-add y-number__inc" :class="{'-disabled': schedulingTime.all === schedulingTime.planned}" @click="inc(idx)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button class="day__btn" icon="i-add_circle" label="Add another day" border @click="add" position="center" grey />
          <div class="dialog__btns">
            <Button class="dialog__btn" label="Cancel" border @click="close" />
            <Button class="dialog__btn" label="Save" @click="save" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
/* eslint-disable */
import {DatePicker} from 'v-calendar'
import Input from '@/components/Yaro/Input'
import Dropdown from '@/components/Yaro/Dropdown'
import Button from '@/components/Yaro/Button'
import Dialog from '@/components/Yaro/Dialog'
import {mapState, mapMutations} from 'vuex'
import dayjs from 'dayjs'
import Ripple from '@/components/Yaro/ripple'

export default {
  name: 'WorkOrderGeneralScheduling',
  components: {DatePicker, Input, Dropdown, Dialog, Button},
  data() {
    return {
      dayjs,
      display: false,
      localDays: [{date: null, shift: null, time: 0}],
      schedulingTime: {
        all: 12,
        planned: 0
      }
    }
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder,
      shifts: s => s.company.shifts.shifts
    })
  },
  watch: {
    localDays: {
      handler(days) {
        const time = days.reduce((sum, current) => sum + current.time, 0)
        this.schedulingTime.planned = time
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      changeScheduling: 'workOrder/changeScheduling'
    }),
    open() {
      this.display = true
      if (this.order.scheduling) this.localDays = [...this.order.scheduling]
    },
    close() {
      this.display = false
    },
    save() {
      this.changeScheduling(this.localDays)
      this.close()
      this.localDays = [{date: null, shift: null, time: 0}]
    },
    // TODO: Field Number Component
    dec(idx) {
      if (!this.localDays[idx].time) return
      this.localDays[idx].time -= 0.5
    },
    inc(idx) {
      if (this.schedulingTime.all === this.schedulingTime.planned) return
      this.localDays[idx].time += 0.5
    },
    // TODO: Field Number Component
    add() {
      if (this.schedulingTime.all === this.schedulingTime.planned) return
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
