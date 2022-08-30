<template>
  <div class="employee__wrapper" @click="show = !show">
    <div class="employee__inner">
      <Label :alias="`${employee.firstName[0]}${employee.lastName[0]}`" circle size="mini" class="-grey" />
      <div class="employee__name">{{ employee.firstName }} {{ employee.lastName }}</div>
      <div class="employee__time" :class="{'-empty': employee.hours === 0}">
        <i class="i-time" />
        <span>{{ employee.days.reduce((prev, next) => prev.hours || prev + next.hours) }} hr</span>
      </div>
      <Button icon="i-keyboard_arrow_down" class="employee__btn" size="mini" border circle />
    </div>
    <div @click.stop v-if="show" class="employee__days">
      <div v-for="(day, idx) of employee.days" :key="idx" class="employee__day day">
        <i class="i-calendar day__icon" />
        <div class="day__date">{{ day.date }}</div>
        <div class="day__hours">
          <i class="i-time" />
          <span>{{ day.hours }} hr</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'

export default {
  name: 'WorkOrderCalendar',
  components: {Label, Button},
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    employee() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
