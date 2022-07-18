<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-title">Customer</div>
        <div class="modal__header-nav">
          <Button icon="i-keyboard_arrow_down" class="-grey" border iconSize="20px" />
          <Button icon="i-keyboard_arrow_up" class="-grey" border iconSize="20px" />
        </div>
        <div class="modal__header-cus">
          <Label alias="MB" border circle size="small" class="-dark" />
          <Button icon="i-add" border circle size="mini" />
        </div>
        <Label icon="i-time blue" iconSize="22px" label="00:20:04" border circle size="large" class="-shadow" />
        <Button icon="i-circle_close" border circle iconSize="20px" size="small" @click="close" />
      </div>
      <div class="modal__body body">
        <div class="body__header">
          <div class="body__title">
            <i class="i-device_hub blue" />
            <span>Customer Request</span>
          </div>
          <div class="body__status">
            <span>Request Status:</span>
            <Label :label="request.status" border class="-light" />
          </div>
        </div>
        <div class="body__request request">
          <div class="request__body">{{ request.notes }}</div>
          <div class="request__desc">
            <div class="request__time">
              <i class="i-time" />
              <span>Est:</span>
              <span>{{ request.estimatedTime }}</span>
            </div>
            <div class="request__time">
              <span>Tracked:</span>
              <span>{{ request.trackedTime }}</span>
            </div>
          </div>
          <div class="request__progress">
            <span class="fill" />
            <span class="fill" />
            <span class="fill" />
            <span />
            <span />
          </div>
        </div>
        <div class="body__notes">
          <div>TECHNICIAN NOTES</div>
          <textarea placeholder="Start typing to add notes"></textarea>
        </div>
        <div class="body__cards cards">
          <div class="cards__title">ADDED CARDS</div>
          <div class="cards__list">
            <Card v-for="(card, idx) of selectedCards" :key="idx" :card="card" @select="select" />
          </div>
        </div>
        <div class="body__footer footer">
          <!-- :modelValue="searchParams" -->
          <!-- @update:modelValue="searchVendors" -->
          <Input placeholder="Search by card to add" iconLeft="i-search1" type="search" />
          <div class="footer__cards cards">
            <div class="cards__title">ALL CARDS RELATED</div>
            <div class="cards__list">
              <Card v-for="(card, idx) of cards" :key="idx" :card="card" @select="select" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'
import Input from '@/components/Yaro/Input'
import Card from './Card'

import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'RequestModal',
  components: {Button, Label, Input, Card},
  data() {
    return {
      request: {},
      cardsList: [
        {
          id: 1,
          name: 'Fuel filter',
          odometerTrack: 80000,
          timeTrackLength: 18,
          relations: 'All Vehicles',
          select: false
        },
        {
          id: 2,
          name: 'Oil filter',
          odometerTrack: 80000,
          timeTrackLength: 18,
          relations: 'Toyota Corolla',
          select: false
        },
        {
          id: 3,
          name: 'Air filter',
          odometerTrack: 80000,
          timeTrackLength: 18,
          relations: 'Tesla Model S',
          select: false
        }
      ]
    }
  },
  async created() {
    // console.log(this.$vfm.modals)
    // await this.fetchCards()
  },
  computed: {
    ...mapState({
      // cards: s => s.company.cards.cards
      // order: s => s.workOrder.workOrder,
      // cards: s => s.company.cardTemplates.templates
    }),
    selectedCards() {
      return this.cardsList.filter(c => c.select)
    },
    cards() {
      return this.cardsList.filter(c => !c.select)
    }
  },
  methods: {
    ...mapActions({
      // fetchCards: 'company/cardTemplates/fetch'
    }),
    ...mapMutations({
      // selectAll: 'company/cards/selectAll',
    }),
    beforeOpen(e) {
      this.request = e.ref.params._rawValue
      console.log(this.request)
    },
    select(id) {
      const card = this.cardsList.find(c => c.id === id)
      card.select = !card.select
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
