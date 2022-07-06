<template>
  <div class="block__wrapper">
    <div class="block__title">Additional Options</div>
    <div class="block__row">
      <div class="block__row-inner">
        <div class="block__cell">
          <i class="i-local_taxi" />
          <span>Need ride to work</span>
        </div>
        <Switch :modelValue="needRide" @click="changeNeedRide" />
        <Dialog v-model:visible="displayNeedRide" :dismissableMask="false">
          <div class="dialog__inner">
            <div class="dialog__header">
              <div class="dialog__title">Ride to work/home</div>
              <button class="dialog__close" @click="closeNeedRideDialog"><i class="i-circle_close" /></button>
            </div>
            <DatePicker v-model="localNeedRideDate" locale="en-Ca">
              <template v-slot="{inputValue, inputEvents}">
                <Input :modelValue="inputValue" v-on="inputEvents" title="Date" iconLeft="i-calendar" placeholder="Choose Date" />
              </template>
            </DatePicker>
            <DatePicker v-model="localNeedRideDate" mode="time" locale="en-Ca" :minute-increment="10">
              <template v-slot="{inputValue, inputEvents}">
                <Input :modelValue="inputValue" v-on="inputEvents" title="Time" iconLeft="i-time" placeholder="Choose Time" />
              </template>
            </DatePicker>
            <textarea v-model="localNoteNeedRide" class="dialog__textarea" placeholder="Start typing your note here..." />
            <div class="dialog__btns">
              <Button class="dialog__btn" label="Cancel" border @click="closeNeedRideDialog" />
              <Button class="dialog__btn" label="Save" @click="saveNeedRideDialog" />
            </div>
          </div>
        </Dialog>
      </div>
      <div v-if="needRide" class="section">
        <div class="section__desc">{{ noteNeedRide }}</div>
        <div class="section__row">
          <div class="section__title">Date</div>
          <div class="section__text">{{ dayjs(needRideDate).format('DD MMM') }}</div>
        </div>
        <div class="section__row">
          <div class="section__title">Time</div>
          <div class="section__text">{{ dayjs(needRideDate).format('hh:mm a') }}</div>
        </div>
        <button v-ripple class="section__btn" @click="openNideRideDialog">
          <i class="i-edit" />
          <span>Edit Info</span>
        </button>
      </div>
    </div>
    <div class="block__row">
      <div class="block__row-inner">
        <div class="block__cell">
          <i class="i-car_rental" />
          <span>Courtesy vehicle</span>
        </div>
        <Switch :modelValue="courtasyVehicle" @click="changeCourtasyVehicle" />
        <Dialog v-model:visible="displayCourtasyVehicle" :dismissableMask="false">
          <div class="dialog__inner">
            <div class="dialog__header">
              <div class="dialog__title">Courtasy vehicle</div>
              <button class="dialog__close" @click="closeCourtasyVehicleDialog"><i class="i-circle_close" /></button>
            </div>

            <DatePicker
              v-model="localCourtasyVehicleDate"
              :popover="{visibility: 'focus', positionFixed: true}"
              locale="en"
              is-range
              :masks="{input: 'DD MMM YYYY'}"
            >
              <template v-slot="{inputValue, inputEvents}">
                <Input :modelValue="formattedRange(inputValue)" v-on="inputEvents.start" title="Date" iconLeft="i-calendar" placeholder="Choose Date" />
              </template>
            </DatePicker>

            <Dropdown v-model="localCourtasyVehicleCar" :options="carsList" title="Choose vehicle">
              <template #value="{value}">
                <div class="y-dropdown-label-custom">
                  <i class="i-directions_car" />
                  <span v-if="value">{{ value }}</span>
                  <span v-else class="-placeholder">Choose vehicle</span>
                </div>
              </template>
              <template #option="{option}">
                <div class="y-dropdown-item-custom">
                  <i class="i-directions_car" />
                  <span>{{ option }}</span>
                </div>
              </template>
            </Dropdown>
            <textarea v-model="localCourtasyVehicleNote" class="dialog__textarea" placeholder="Start typing your note here..." />
            <div class="dialog__btns">
              <Button class="dialog__btn" label="Cancel" border @click="closeCourtasyVehicleDialog" />
              <Button class="dialog__btn" label="Save" @click="saveCourtasyVehicleDialog" />
            </div>
          </div>
        </Dialog>
      </div>
      <div v-if="courtasyVehicle" class="section">
        <div class="section__row">
          <div class="section__title">Date</div>
          <div class="section__text">
            <span>{{ dayjs(courtasyVehicleDate.start).format('DD MMM') }}</span>
            <span v-if="dayjs(courtasyVehicleDate.start).format('DD MMM') !== dayjs(courtasyVehicleDate.end).format('DD MMM')">
              ~ {{ dayjs(courtasyVehicleDate.end).format('DD MMM') }}
            </span>
          </div>
        </div>
        <div class="section__row">
          <div class="section__title">Vehicle</div>
          <div class="section__text">{{ courtasyVehicleCar }}</div>
        </div>
        <button v-ripple class="section__btn" @click="openCourtasyVehicleDialog">
          <i class="i-edit" />
          <span>Edit Info</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Switch from '@/components/Yaro/Switch'
import Dialog from '@/components/Yaro/Dialog'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import Dropdown from '@/components/Yaro/Dropdown'
import {DatePicker} from 'v-calendar'
import dayjs from 'dayjs'

import Ripple from '@/components/Yaro/ripple'

export default {
  name: 'WorkOrderGeneralOptions',
  components: {Switch, Dialog, Button, DatePicker, Input, Dropdown},
  data() {
    return {
      dayjs,
      //========= BLOCK: Need ride to work =========
      needRide: false,
      displayNeedRide: false,
      needRideDate: null,
      localNeedRideDate: null,
      noteNeedRide: null,
      localNoteNeedRide: null,
      // ===========================================
      //========= BLOCK: Courtasy vehicle =========
      courtasyVehicle: false,
      displayCourtasyVehicle: false,

      courtasyVehicleDate: {start: null, end: null},
      localCourtasyVehicleDate: {start: null, end: null},

      courtasyVehicleNote: null,
      localCourtasyVehicleNote: null,

      courtasyVehicleCar: null,
      localCourtasyVehicleCar: null,
      carsList: ['Tesla Model S', 'Cupra Formentor', 'Ford F-150', 'Audi e-tron']
      // ===========================================
    }
  },
  methods: {
    //========= BLOCK: Need ride to work =========
    changeNeedRide() {
      if (this.needRide) this.needRide = false
      else this.openNideRideDialog()
    },
    openNideRideDialog() {
      this.displayNeedRide = true
      this.localNeedRideDate = this.needRideDate
      this.localNoteNeedRide = this.noteNeedRide
    },
    closeNeedRideDialog() {
      this.displayNeedRide = false
      this.localNeedRideDate = null
      this.localNoteNeedRide = null
    },
    saveNeedRideDialog() {
      this.displayNeedRide = false
      this.needRide = true
      this.needRideDate = this.localNeedRideDate
      this.noteNeedRide = this.localNoteNeedRide
      this.localNeedRideDate = null
      this.localNoteNeedRide = null
    },
    // ===========================================
    //========= BLOCK: Courtasy vehicle =========
    changeCourtasyVehicle() {
      if (this.courtasyVehicle) this.courtasyVehicle = false
      else this.openCourtasyVehicleDialog()
    },
    openCourtasyVehicleDialog() {
      this.displayCourtasyVehicle = true
      this.localCourtasyVehicleDate = this.courtasyVehicleDate
      this.localCourtasyVehicleNote = this.courtasyVehicleNote
      this.localCourtasyVehicleCar = this.courtasyVehicleCar
    },
    closeCourtasyVehicleDialog() {
      this.displayCourtasyVehicle = false
      this.localCourtasyVehicleDate = null
      this.localCourtasyVehicleNote = null
      this.localCourtasyVehicleCar = null
    },
    saveCourtasyVehicleDialog() {
      this.displayCourtasyVehicle = false
      this.courtasyVehicle = true

      this.courtasyVehicleDate = this.localCourtasyVehicleDate
      this.courtasyVehicleNote = this.localCourtasyVehicleNote
      this.courtasyVehicleCar = this.localCourtasyVehicleCar
      this.localCourtasyVehicleDate = null
      this.localCourtasyVehicleNote = null
      this.localCourtasyVehicleCar = null
    },
    formattedRange({start, end}) {
      if (!start) return ''
      if (start === end) return start
      return start + ' ~ ' + end
    }
    // ===========================================
  },
  directives: {
    ripple: Ripple
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
