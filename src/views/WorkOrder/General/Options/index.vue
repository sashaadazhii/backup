<template>
  <div class="block__wrapper">
    <div class="block__title">Additional Options</div>
    <div class="block__row">
      <div class="block__row-inner">
        <div class="block__cell">
          <i class="i-local_taxi" :class="{'-green': needRide}" />
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
        <div class="section__desc">{{ order.needRide.note }}</div>
        <div class="section__row">
          <div class="section__title">Date</div>
          <div class="section__text">{{ dayjs(order.needRide?.date).format('DD MMM') }}</div>
        </div>
        <div class="section__row">
          <div class="section__title">Time</div>
          <div class="section__text">{{ dayjs(order.needRide?.date).format('hh:mm a') }}</div>
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
          <i class="i-car_rental" :class="{'-green': courtesyVehicle}" />
          <span>Courtesy vehicle</span>
        </div>
        <Switch :modelValue="courtesyVehicle" @click="changeCourtesyVehicle" />
        <Dialog v-model:visible="displayCourtesyVehicle" :dismissableMask="false">
          <div class="dialog__inner">
            <div class="dialog__header">
              <div class="dialog__title">Courtasy vehicle</div>
              <button class="dialog__close" @click="closeCourtesyVehicleDialog"><i class="i-circle_close" /></button>
            </div>

            <DatePicker
              v-model="localCourtesyVehicleDate"
              :popover="{visibility: 'focus', positionFixed: true}"
              locale="en"
              is-range
              :masks="{input: 'DD MMM YYYY'}"
            >
              <template v-slot="{inputValue, inputEvents}">
                <Input :modelValue="formattedRange(inputValue)" v-on="inputEvents.start" title="Date" iconLeft="i-calendar" placeholder="Choose Date" />
              </template>
            </DatePicker>

            <Dropdown v-model="localCourtesyVehicleCar" :options="carsList" title="Choose vehicle">
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
            <textarea v-model="localCourtesyVehicleNote" class="dialog__textarea" placeholder="Start typing your note here..." />
            <div class="dialog__btns">
              <Button class="dialog__btn" label="Cancel" border @click="closeCourtesyVehicleDialog" />
              <Button class="dialog__btn" label="Save" @click="saveCourtesyVehicleDialog" />
            </div>
          </div>
        </Dialog>
      </div>
      <div v-if="courtesyVehicle" class="section">
        <div class="section__row">
          <div class="section__title">Date</div>
          <div class="section__text">
            <span>{{ dayjs(order.courtesyVehicle?.date?.start).format('DD MMM') }}</span>
            <span v-if="dayjs(order.courtesyVehicle?.date?.start).format('DD MMM') !== dayjs(order.courtesyVehicle?.date?.end).format('DD MMM')">
              ~ {{ dayjs(order.courtesyVehicle?.date?.end).format('DD MMM') }}
            </span>
          </div>
        </div>
        <div class="section__row">
          <div class="section__title">Vehicle</div>
          <div class="section__text">{{ order.courtesyVehicle.vehicle }}</div>
        </div>
        <button v-ripple class="section__btn" @click="openCourtesyVehicleDialog">
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
import {mapState, mapMutations} from 'vuex'
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
      localNeedRideDate: null,
      localNoteNeedRide: null,
      // ===========================================
      //========= BLOCK: Courtasy vehicle =========
      courtesyVehicle: false,
      displayCourtesyVehicle: false,
      localCourtesyVehicleDate: {start: null, end: null},
      localCourtesyVehicleNote: null,
      localCourtesyVehicleCar: null,
      carsList: ['Tesla Model S', 'Cupra Formentor', 'Ford F-150', 'Audi e-tron']
      // ===========================================
    }
  },
  created() {
    const {needRide, courtesyVehicle} = this.order
    this.needRide = !!needRide
    this.courtesyVehicle = !!courtesyVehicle
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder
    })
  },
  methods: {
    ...mapMutations({
      saveNeedRide: 'workOrder/changeNeedRide',
      saveCourtesyVehicle: 'workOrder/changeCourtesyVehicle'
    }),
    //========= BLOCK: Need ride to work =========
    changeNeedRide() {
      if (this.needRide) {
        this.saveNeedRide()
        this.needRide = false
      } else this.openNideRideDialog()
    },
    openNideRideDialog() {
      this.displayNeedRide = true
      this.localNeedRideDate = this.order.needRide?.date
      this.localNoteNeedRide = this.order.needRide?.note
    },
    closeNeedRideDialog() {
      this.displayNeedRide = false
      this.localNeedRideDate = null
      this.localNoteNeedRide = null
    },
    saveNeedRideDialog() {
      this.needRide = true
      this.saveNeedRide({date: this.localNeedRideDate, note: this.localNoteNeedRide})
      this.closeNeedRideDialog()
    },
    // ===========================================
    //========= BLOCK: Courtasy vehicle =========
    changeCourtesyVehicle() {
      if (this.courtesyVehicle) {
        this.saveCourtesyVehicle()
        this.courtesyVehicle = false
      } else this.openCourtesyVehicleDialog()
    },
    openCourtesyVehicleDialog() {
      this.displayCourtesyVehicle = true
      this.localCourtesyVehicleDate = this.order.courtesyVehicle?.date
      this.localCourtesyVehicleNote = this.order.courtesyVehicle?.note
      this.localCourtesyVehicleCar = this.order.courtesyVehicle?.vehicle
    },
    closeCourtesyVehicleDialog() {
      this.displayCourtesyVehicle = false
      this.localCourtesyVehicleDate = null
      this.localCourtesyVehicleNote = null
      this.localCourtesyVehicleCar = null
    },
    saveCourtesyVehicleDialog() {
      this.courtesyVehicle = true
      this.saveCourtesyVehicle({date: this.localCourtesyVehicleDate, note: this.localCourtesyVehicleNote, vehicle: this.localCourtesyVehicleCar})
      this.closeCourtesyVehicleDialog()
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
