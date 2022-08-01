<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-title">Customer</div>
        <div class="modal__header-nav">
          <Button icon="i-keyboard_arrow_down" class="-grey" border iconSize="20px" @click="changeRequest('dec')" />
          <Button icon="i-keyboard_arrow_up" class="-grey" border iconSize="20px" @click="changeRequest('inc')" />
        </div>
        <div class="tech__list">
          <div v-for="(tech, idx) of request.techs" :key="idx" class="tech__label">{{ tech.firstName[0] }}{{ tech.lastName[0] }}</div>
          <Multiselect v-model="request.techs" :options="techList" dataKey="id">
            <template #menu>
              <div class="tech__add"><i class="i-add" /></div>
            </template>
            <template #option="{option}">
              <div class="y-dropdown-item-custom">{{ option.firstName }} {{ option.lastName }}</div>
            </template>
          </Multiselect>
        </div>
        <Label icon="i-time blue" iconSize="22px" label="00:20:04" border circle size="large" class="-shadow" />
        <Button icon="i-circle_close" border circle iconSize="20px" size="small" @click="close" />
      </div>
      <div class="modal__body body">
        <div class="body__header">
          <div class="body__title">
            <i class="i-device_hub blue" />
            <span>Customer Request {{ requestIdx }}</span>
          </div>
          <div class="body__status">
            <span>Request Status:</span>
            <Menu :list="statuses">
              <template #menu>
                <Label :label="request.status" size="small" class="request__label -hover" :class="labelClass(request.status)" />
              </template>
            </Menu>
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
        <div v-if="request.cards.length" class="body__cards cards">
          <div class="cards__title">ADDED CARDS</div>
          <div class="cards__list">
            <Card v-for="(card, idx) of request.cards" :key="idx" :card="card" selected @select="changeCards" />
          </div>
        </div>
        <div class="body__footer footer">
          <!-- :modelValue="searchParams" -->
          <!-- @update:modelValue="searchVendors" -->
          <Input placeholder="Search by card to add" iconLeft="i-search1" type="search" />
          <div class="footer__cards cards">
            <div class="cards__title">ALL CARDS RELATED</div>
            <div class="cards__list">
              <Card v-for="(card, idx) of cards" :key="idx" :card="card" @select="changeCards" />
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
import Menu from '@/components/Yaro/Menu'
import Multiselect from '@/components/Yaro/Multiselect'

import Card from './Card'

import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'RequestModal',
  components: {Button, Label, Input, Card, Menu, Multiselect},
  data() {
    return {
      statuses: [
        {label: 'Not Processed', command: () => this.changeStatus({status: 'Not Processed', id: this.request.id})},
        {label: 'Done', command: () => this.changeStatus({status: 'Done', id: this.request.id})},
        {label: 'Unable to reproduce', command: () => this.changeStatus({status: 'Unable to reproduce', id: this.request.id})}
      ],
      status: null,
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
    // await this.fetchCards()
  },
  computed: {
    ...mapState({
      request: s => s.requests.request,
      requests: s => s.requests.requests,
      techList: s => s.company.users.users.filter(u => u.role === 'technician')
    }),
    requestIdx() {
      const id = this.request.id
      return this.requests.findIndex(r => r.id === id) + 1
    },
    cards() {
      return this.cardsList.filter(card => this.request.cards.every(c => !(c.id === card.id)))
    }
  },
  methods: {
    ...mapMutations({
      set: 'requests/setRequest',
      changeRequest: 'requests/changeRequest',
      changeStatus: 'requests/changeStatus',
      changeCards: 'requests/changeCards'
    }),
    select(id) {
      // console.log(id)
      // const card = this.cardsList.find(c => c.id === id)
      // card.select = !card.select
    },
    labelClass(status) {
      return {
        '-grey': status === 'Not Processed',
        '-red': status === 'Unable to reproduce',
        '-green': status === 'Done'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
