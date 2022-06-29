<template>
  <div class="wrap">
    <DatePicker v-model="date" mode="dateTime" :minute-increment="5" :popover="{visibility: 'focus'}" locale="en">
      <template v-slot="{inputValue, inputEvents}">
        <Input :modelValue="`${inputValue}`" v-on="inputEvents" />
      </template>
    </DatePicker>
    <!-- <DatePicker v-model="range" is-range>
      <template v-slot="{inputValue, inputEvents}">
        <input :value="`${inputValue.start} ~ ${inputValue.end}`" v-on="inputEvents.start" />
      </template>
    </DatePicker> -->
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import {Calendar, DatePicker} from 'v-calendar'
import Input from '@/components/Yaro/Input'
export default {
  name: 'test',
  components: {DatePicker, Input},
  data() {
    return {
      date: new Date(),
      range: {
        start: new Date(2020, 9, 12),
        end: new Date(2020, 9, 16)
      },
      value: null
    }
  }
}
</script>
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
