<template>
  <div class="totals__wrapper">
    <div class="totals__title">Totals</div>
    <Total v-for="total of totals" :key="total.id" :total="total" />
  </div>
</template>

<script>
import Total from './Total'

export default {
  name: 'FinanceTotals',
  components: {Total},
  data() {
    return {
      totals: [
        {
          id: 4,
          color: 'grey',
          name: 'Total Parts',
          price: 248
        },
        {
          id: 5,
          color: 'grey',
          name: 'Total Labour',
          price: 220
        },
        {
          id: 6,
          color: 'grey',
          name: 'Sub Total',
          price: 580
        },
        {
          id: 7,
          color: 'grey',
          name: 'HST',
          price: 98
        },
        {
          id: 7,
          color: 'dark',
          name: 'Grand Total',
          price: 848
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
