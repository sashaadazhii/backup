<template>
  <div class="chart__wrapper">
    <div class="chart__inner">
      <RadialProgress v-bind="props">
        <div class="chart__title">JOB PROFITABILITY</div>
        <div class="chart__subtitle">$92/h</div>
      </RadialProgress>
    </div>
  </div>
</template>

<script>
import RadialProgress from 'vue3-radial-progress'
export default {
  name: 'FinanceChart',
  components: {
    RadialProgress
  },
  data() {
    return {
      props: {
        diameter: 220,
        'completed-steps': 7,
        'total-steps': 10,
        startColor: '#FF9B70',
        stopColor: '#FF9B70',
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
