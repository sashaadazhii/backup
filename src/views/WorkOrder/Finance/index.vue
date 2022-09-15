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
import {mapState} from 'vuex'

export default {
  name: 'FinancePage',
  components: {Card, Totals, Request, Label},
  computed: {
    ...mapState({
      cards: s => s.finance.cards
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
