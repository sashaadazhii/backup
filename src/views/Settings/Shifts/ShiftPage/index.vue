<template>
  <div class="shift__wrapper">
    <div class="shift__header">
      <div class="shift__header-title">
        <Label icon="i-view_stream" circle size="large" class="shift__header-label" />
        <span v-if="isNew">Add Shift</span>
        <span v-else>Update Shift</span>
      </div>
      <div class="shift__header-buttons">
        <Button label="Cancel" border @click="$router.back()" />
        <Button label="Save" @click="save" :loading="isLoading" />
      </div>
    </div>
    <div class="shift__inner">
      <div class="shift__main">
        <div class="shift__color">
          <div class="shift__color-title">Color:</div>
          <Colors v-model="color" :list="colorsList" />
        </div>

        <Input
          v-model="name"
          title="Shift Name"
          placeholder="Shift Name"
          :error="v$.name.$error || errorName"
          :errorMessage="errorName"
          @input="errorName = null"
        />
        <Input v-model="shortName" title="Short Name" placeholder="Short Name" />
        <Input v-model="location" title="Location" placeholder="Location" :error="v$.location.$error" />
        <Textarea v-model="description" title="Description" placeholder="Description" />
        <div class="shift__time">
          <div class="shift__time-title">Start Time</div>
          <Dropdown v-model="startTime.hours" :options="hoursList" placeholder="Hours" :error="v$.startTime.hours.$error" />
          <Dropdown v-model="startTime.minutes" :options="minutesList" placeholder="Minutes" :error="v$.startTime.minutes.$error" />
          <div class="shift__time-periods">
            <div class="shift__time-period" :class="{'shift__time-period--active': startTime.timePeriod === 'AM'}" @click="startTime.timePeriod = 'AM'">AM</div>
            <div class="shift__time-period" :class="{'shift__time-period--active': startTime.timePeriod === 'PM'}" @click="startTime.timePeriod = 'PM'">PM</div>
          </div>
        </div>
        <div class="shift__time">
          <div class="shift__time-title">End Time</div>
          <Dropdown v-model="endTime.hours" :options="hoursList" placeholder="Hours" :error="v$.endTime.hours.$error" />
          <Dropdown v-model="endTime.minutes" :options="minutesList" placeholder="Minutes" :error="v$.endTime.minutes.$error" />
          <div class="shift__time-periods">
            <div class="shift__time-period" :class="{'shift__time-period--active': endTime.timePeriod === 'AM'}" @click="endTime.timePeriod = 'AM'">AM</div>
            <div class="shift__time-period" :class="{'shift__time-period--active': endTime.timePeriod === 'PM'}" @click="endTime.timePeriod = 'PM'">PM</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import Colors from '@/components/Yaro/Colors'
import Input from '@/components/Yaro/Input'
import Textarea from '@/components/Yaro/Textarea'
import Dropdown from '@/components/Yaro/Dropdown'
import useVuelidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'

export default {
  name: 'CompanySettingsShiftPage',
  components: {Button, Label, Colors, Input, Textarea, Dropdown},
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      colorsList: ['#FFC2BE', '#EA6057', '#FA3225', '#FFBEE5', '#FE7CCA', '#FF4CB8', '#BA8AE7'],
      shift: {},
      color: null,
      name: null,
      shortName: null,
      location: null,
      startTime: {
        hours: null,
        minutes: null,
        timePeriod: 'AM'
      },
      endTime: {
        hours: null,
        minutes: null,
        timePeriod: 'AM'
      },
      description: null,
      errorName: null,
      hoursList: ['01 h', '02 h', '03 h', '04 h', '05 h', '06 h', '07 h', '08 h', '09 h', '10 h', '11 h', '12 h'],
      minutesList: ['00 min', '10 min', '20 min', '30 min', '40 min', '50 min', '60 min'],
      isNew: this.$route.params.id === 'new'
    }
  },
  async created() {
    const shiftID = this.$route.params.id
    if (shiftID === 'new') this.color = this.colorsList[0]
    else {
      if (!this.localShift.id) {
        try {
          this.isLoading = true
          await this.find(shiftID)
        } finally {
          this.isLoading = false
        }
      }

      const {color, name, shortName, description, location, startTime: strStartTime, endTime: strEndTime} = this.localShift

      this.color = color
      this.name = name
      this.shortName = shortName
      this.location = location
      this.description = description

      this.startTime.hours = `${strStartTime.slice(0, 2)} h`
      this.startTime.minutes = `${strStartTime.slice(3, 5)} min`
      this.startTime.timePeriod = `${strStartTime.slice(5, 7)}`

      this.endTime.hours = `${strEndTime.slice(0, 2)} h`
      this.endTime.minutes = `${strEndTime.slice(3, 5)} min`
      this.endTime.timePeriod = `${strEndTime.slice(5, 7)}`
    }
  },
  computed: {
    ...mapState({
      localShift: s => s.company.shifts.shift
    })
  },
  methods: {
    ...mapActions({
      find: 'company/shifts/find',
      create: 'company/shifts/create',
      update: 'company/shifts/update'
    }),
    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return

      const {name, description, color, startTime: objStartTime, endTime: objEndTime, location, shortName} = this
      const startTime = `${objStartTime.hours.slice(0, 2)}:${objStartTime.minutes.slice(0, 2)}${objStartTime.timePeriod}`
      const endTime = `${objEndTime.hours.slice(0, 2)}:${objEndTime.minutes.slice(0, 2)}${objEndTime.timePeriod}`
      const shift = {
        name,
        color,
        startTime,
        endTime,
        location
      }
      if (shortName) shift.shortName = shortName
      if (description) shift.description = description

      try {
        this.isLoading = true
        if (this.isNew) {
          await this.create(shift)
        } else {
          await this.update({shift, id: this.localShift.id})
        }
        this.$router.back()
      } catch (err) {
        const errors = err.response.data.details
        const errorName = errors.find(err => err.field === 'name')
        this.errorName = errorName.message
      } finally {
        this.isLoading = false
      }
    }
  },
  validations() {
    return {
      name: {required},
      location: {required},
      color: {required},
      startTime: {
        required,
        minutes: {required},
        hours: {required},
        timePeriod: {required}
      },
      endTime: {
        required,
        minutes: {required},
        hours: {required},
        timePeriod: {required}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
