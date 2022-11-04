<template>
  <div class="page-inner" :class="{requests: requests.length}">
    <div v-if="requests && requests.length" class="requests__wrapper">
      <Request v-for="request of requests" :key="request.id" :request="request" />
    </div>
    <div class="health__wrapper">
      <div class="health__header">
        <Input :modelValue="searchValue" size="medium" icon-left="i-search1" placeholder="Start typing to search card" @input="changeSearch" />
        <Button label="Add Card from Library" icon="i-add_circle" @click="addCard" />
      </div>
      <div class="health__table table">
        <div class="table__header">
          <div class="table__header-cell">Card status</div>
          <div class="table__header-cell">Card name</div>
          <div class="table__header-cell">Price</div>
          <div class="table__header-cell">Approval Status</div>
          <div class="table__header-cell">Service Tracking</div>
          <div></div>
        </div>
        <div class="table__main">
          <!-- <Slot v-for="card of formattedCards()" :key="card.id" :card="card" @click.self="openCard(card)" @changeStatus="changeStatus(card)" /> -->
          <Slot v-for="card of order.cannedServices" :key="card.id" :card="card" @click.self="openCard(card)" @changeStatus="changeStatus(card)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import Slot from './Slot'
import AddCard from './AddCard'
import CardPage from './CardPage'
import Request from './RequestComponent'
import {serviceList} from '@/store/data/cannedServices.js'
import _ from 'lodash'

export default {
  name: 'SAView',
  components: {Button, Input, Slot, Request},

  data() {
    return {}
  },
  async created() {
    const uid = this.$route.params.uid
    await this.fetch()
    await this.findOrder(uid)
  },

  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder,
      cards: s => s.company.cards.cards,
      card: s => s.company.cards.card,
      searchValue: s => s.company.cards.searchValue,
      isStart: s => s.workOrder.isStart
    }),
    actualCards() {
      return this.cards.filter(c => c.status !== 'Good')
    },
    requests() {
      return this.order.customerRequests && this.order.customerRequests.length > 0 ? this.order.customerRequests : []
    }
  },
  methods: {
    ...mapActions({
      fetch: 'company/cards/fetch',
      findOrder: 'workOrder/find'
    }),
    ...mapMutations({
      setSearch: 'company/cards/setSearch',
      setCard: 'company/cards/setCard',
      updateCard: 'company/cards/updateCard'
    }),
    formattedCards() {
      // return this.actualCards.map(card => {
      //   return {
      //     ...card,
      //     services: serviceList.filter(s => s.templateID === card.id)
      //   }
      // })
    },
    changeSearch(searchValue) {
      this.setSearch(searchValue)
      this.fetch()
    },
    addCard() {
      if (!this.isStart) return
      this.$vfm.show({
        component: AddCard,
        bind: {
          name: 'AddCard',
          'click-to-close': false
        }
      })
    },
    openCard(card) {
      this.setCard(card)
      this.$vfm.show({
        component: CardPage,
        bind: {
          name: 'AdvisorCardPage',
          'click-to-close': false,
          'esc-to-close': true
        }
      })
    },
    changeStatus(card) {
      card.advisorApprove = !card.advisorApprove
      this.updateCard(card)
    },
    labelColor() {
      const status = this.card.status
      switch (status) {
        case 'Component Unsafe':
          return '#F37878'
        case 'Recommended':
          return ' #FFA14E'
        case 'Done':
          return '#10B981'
        default:
          return '#6b7280'
      }
    },
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    }
  }
}
</script>
<style scoped lang="scss">
@import 'style';
</style>
