<template>
  <div class="finance__wrapper">
    <div class="finance__header">
      <div class="finance__title">Quote # 121213</div>
      <Menu :list="statusesChange">
        <template #menu>
          <Label :label="status" size="small" :class="labelClass(status)" class="finance__label" />
        </template>
      </Menu>
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
import Menu from '@/components/Yaro/Menu'
import Label from '@/components/Yaro/Label'
import {mapState} from 'vuex'

export default {
  name: 'FinancePage',
  components: {Card, Totals, Request, Label, Menu},
  data() {
    return {
      statusesChange: [
        {label: 'Not Started', command: () => this.changeStatus('Not Started')},
        {label: 'In Progress', command: () => this.changeStatus('In Progress')},
        {label: 'Done', command: () => this.changeStatus('Done')}
      ],
      status: 'In Progress'
    }
  },
  computed: {
    ...mapState({
      cards: s => s.finance.cards
    })
  },
  methods: {
    changeStatus(status) {
      this.status = status
    },
    labelClass(status) {
      return {
        '-orange': status === 'In Progress',
        '-none': status === 'Not Started',
        '-green': status === 'Done'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
