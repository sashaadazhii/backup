<template>
  <div class="finance__wrapper">
    <div class="finance__cards"><Card /> <Request /></div>
    <div class="finance__info"><Chart /><Total /></div>
  </div>
</template>

<script>
import Card from './Card'
import Request from './Request'
import Chart from './Chart'
import Total from './Total'
export default {
  name: 'FinancePage',
  components: {Card, Chart, Total, Request}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
