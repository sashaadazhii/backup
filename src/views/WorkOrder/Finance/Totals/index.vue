<template>
  <div class="totals__wrapper">
    <div class="totals__title">Totals</div>
    <Total v-for="total of totals" :key="total.id" :total="total" />
    
    <!-- <div class="totals__block block">
      <div class="block__row">
        <div class="block__icon -grey" />
        <div class="block__name">Total Parts</div>
        <div class="block__desc">$249</div>
      </div>
      <div class="block__row">
        <div class="block__icon -grey" />
        <div class="block__name">Total Labour</div>
        <div class="block__desc">$220</div>
      </div>
      <div class="block__row">
        <div class="block__icon -grey" />
        <div class="block__name">Sub Total</div>
        <div class="block__desc">$550</div>
      </div>
      <div class="block__row">
        <div class="block__icon -grey" />
        <div class="block__name">HST</div>
        <div class="block__desc">$71.5</div>
      </div>
      <div class="block__row">
        <div class="block__icon -dark" />
        <div class="block__name">Grand Total</div>
        <div class="block__desc">$656</div>
      </div>
    </div> -->
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
          id: 1,
          color: 'green',
          name: 'Cooling System Service',
          price: 320,
          parts: [
            {
              id: 1,
              name: 'Part #2323-342-234',
              quantity: 12,
              price: 12
            },
            {
              id: 2,
              name: 'Part #2323-342-124',
              quantity: 8,
              price: 4
            },
            {
              id: 3,
              name: 'Part #5234-342-234',
              quantity: 2,
              price: 22
            },
            {
              id: 4,
              name: 'Environmental Charge',
              quantity: 0,
              price: 180
            },
            {
              id: 5,
              name: 'Engine Belt',
              quantity: 0,
              price: 230
            }
          ]
        },
        {
          id: 1,
          color: 'green',
          name: 'Air filter change',
          price: 40,
          parts: [
            {
              id: 1,
              name: 'Air Filter',
              quantity: 0,
              price: 22
            },
            {
              id: 2,
              name: 'Part #2323-342-124',
              quantity: 4,
              price: 4
            }
          ]
        },
        {
          id: 3,
          color: 'red',
          name: 'Cabin Filter change',
          price: 48,
          parts: [
            {
              id: 1,
              name: 'Cabin Filter',
              quantity: 0,
              price: 30
            },
            {
              id: 2,
              name: 'Part #2323-342-124',
              quantity: 4,
              price: 4
            }
          ]
        },
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
