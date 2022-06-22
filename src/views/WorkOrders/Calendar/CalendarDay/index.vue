<template>
  <div class="day__wrapper" :class="{active: day.active}">
    <div class="day__date">
      <div class="day__date-num">{{ dayjs(day.day).format('DD') }}</div>
      <div class="day__date-month">{{ dayjs(day.day).format('ddd') }}</div>
    </div>
    <div class="day__progress">
      <div class="progress__wrap">
        <div class="progress__name">Oriole</div>
        <div class="progress__line green">
          <div class="progress__line-bg"></div>
          <div class="progress__line-front"></div>
        </div>
        <div class="progress__percents">30%</div>
      </div>
      <div class="progress__wrap">
        <div class="progress__name">Ind.</div>
        <div class="progress__line orange">
          <div class="progress__line-bg"></div>
          <div class="progress__line-front"></div>
        </div>
        <div class="progress__percents">60%</div>
      </div>
      <div class="progress__wrap">
        <div class="progress__name">Night</div>
        <div class="progress__line red">
          <div class="progress__line-bg"></div>
          <div class="progress__line-front"></div>
        </div>
        <div class="progress__percents">90%</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'CalendarDay',
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dayjs
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
