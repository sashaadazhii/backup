<template>
  <div class="job__wrapper">
    <div class="job__inner">
      <div class="job__title">Main Job Labour</div>
      <div class="job__table">
        <div class="table__row">
          <div class="table__cell">Sold Time</div>
          <div class="table__cell -input"><Input size="mini" /></div>
          <div class="table__cell">$125.00</div>
          <div class="table__cell">$125.00</div>
        </div>
        <div class="table__row">
          <div class="table__cell">Warranty Time</div>
          <div class="table__cell -input"><Input size="mini" /></div>
          <div class="table__cell">$125.00</div>
          <div class="table__cell">$125.00</div>
        </div>
        <div class="table__row">
          <div class="table__cell">Discount Time</div>
          <div class="table__cell -input"><Input size="mini" /></div>
          <div class="table__cell">$125.00</div>
          <div class="table__cell">$125.00</div>
        </div>
        <div class="table__row">
          <div class="table__cell -bold">Billable Time</div>
          <div class="table__cell -input"><Input size="mini" /></div>
          <div class="table__cell">$125.00</div>
          <div class="table__cell">$125.00</div>
        </div>
      </div>
    </div>
    <div class="job__chart chart">
      <Label label="Real Hourly Rate" circle size="small" class="-grey" />
      <RadialProgress v-bind="props">
        <div class="chart__title">$92/h</div>
      </RadialProgress>
    </div>
  </div>
</template>

<script>
import RadialProgress from 'vue3-radial-progress'
import Label from '@/components/Yaro/Label'
import Input from '@/components/Yaro/Input'

export default {
  name: 'InfoJob',
  components: {RadialProgress, Label, Input},
  data() {
    return {
      props: {
        diameter: 120,
        'completed-steps': 5,
        'total-steps': 10,
        startColor: '#F37878',
        stopColor: '#F37878',
        innerStrokeColor: '#E5E7EB',
        strokeWidth: 6,
        innerStrokeWidth: 6
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
