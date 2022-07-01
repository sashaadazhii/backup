<template>
  <div class="wrap">
    <!-- <DatePicker v-model="date" mode="dateTime" :minute-increment="5"> -->

    <DatePicker v-model="date">
      <template v-slot="{inputValue, inputEvents}">
        <Input :modelValue="`${inputValue}`" v-on="inputEvents" size="medium" />
      </template>
    </DatePicker>
    <!-- <Calendar v-model="date" is-range :columns="$screens({default: 1, lg: 2})"  locale="en-CA" :first-day-of-week="2"  /> -->
    <!-- <Calendar v-model="date" /> -->
    <!-- <y-calendar v-model="date" /> -->
    <!-- <y-date-picker v-model="date" class="custom-date-picker" /> -->
    <Dropdown v-model="item" :options="list" title="Responsible Service Advisor" size="medium">
      <template #value="{value}">
        <div class="y-dropdown-label-custom">
          <span class="-title">Time Period:</span>
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
    <Button icon="i-print" border />
    <div style="display: flex;">
      <Button icon="i-print" border label="asfsafaf" grey style="width: 100%" position="center" size="huge" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import {Calendar, DatePicker} from 'v-calendar'
import Input from '@/components/Yaro/Input'
import Dropdown from '@/components/Yaro/Dropdown'
import Button from '@/components/Yaro/Button'

export default {
  name: 'test',
  components: {Input, DatePicker, Dropdown, Button},
  // components: {Calendar},
  data() {
    return {
      date: new Date(),
      range: {
        start: new Date(2020, 9, 12),
        end: new Date(2020, 9, 16)
      },
      value: null,
      item: null,
      list: ['afasf', 'sdgsdgshsd', 'sdgoiqewrqwr', 'gasgagsasg']
    }
  }
}
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.wrap {
  padding: 100px;
  // display: flex;
  // justify-content: flex-end;
  // column-gap: 20px;
  // height: inherit;
  // overflow: auto;
}
.y-label--circle {
  border-color: red;
}

.dialog_yohoho {
  background-color: red;
  min-width: 300px;
}

// ::v-deep(.y-dialog) {
//   width: 96%;
//   max-width: 400px;
//   border-radius: 20px;
//   display: none !important;
// }

@import '~primevue/resources/themes/lara-light-indigo/theme.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
</style>
