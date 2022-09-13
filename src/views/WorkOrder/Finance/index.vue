<template>
  <div class="finance__wrapper">
    <div class="finance__header">
      <div class="finance__title">Quote # 121213</div>
      <Label label="In progress" size="small" class="-orange" />
    </div>
    <div class="finance__inner">
      <div class="finance__cards">
        <Card v-for="(card, idx) of cards" :key="idx" :card="card" @onCardDone="card.done = true" />
        <Request />
      </div>
      <div class="finance__info"><Totals /></div>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import Request from './Request'
import Totals from './Totals'
import Label from '@/components/Yaro/Label'

export default {
  name: 'FinancePage',
  /* eslint-disable  */
  components: {Card, Totals, Request, Label},

  data() {
    return {
      cards: [
        {
          id: 1,
          status: 'Recommended',
          approvalStatus: 'Approved For Next Visit',
          title: 'Cooling System Service',
          price: 320,
          description:
            'Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine performance',
          isDone: false
        },
        {
          id: 2,
          status: 'Recommended',
          approvalStatus: 'Approved By SA',
          title: 'Air filter change',
          price: 380,
          description:
            'Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine performance',
          isDone: false
        },
        {
          id: 4,
          status: 'Component Unsafe',
          approvalStatus: 'Permanently Declined',
          title: 'Engine Belt',
          price: 200,
          description:
            'Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine performance'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
