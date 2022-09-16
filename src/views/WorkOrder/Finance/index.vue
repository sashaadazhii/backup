<template>
  <div class="finance__wrapper">
    <div class="finance__header header">
      <div class="header__top">
        <div class="header__left">
          <div class="finance__title">Quote # 121213</div>
          <Menu :list="statusesChange">
            <template #menu>
              <Label :label="status" size="small" :class="labelClass(status)" class="finance__label" />
            </template>
          </Menu>
        </div>
        <div class="header__right">
          <Filter
            v-model="activeFilters"
            :options="filtersList"
            dataKey="id"
            optionLabel="name"
            optionListLabel="name"
            optionListChildren="list"
            size="medium"
            openPosition="left"
            @change="changeFilters"
          >
            <template #optionlist="{option}">
              <div class="y-dropdown-item-custom">
                <i v-if="option.name === 'Card Status'" class="i-layers" />
                <i v-if="option.name === 'Approval Status'" class="i-mark" />
                <span>{{ option.name }}</span>
              </div>
            </template>
          </Filter>
        </div>
      </div>
      <div class="header__bottom">
        <div v-if="activeFilters.length" class="chip__wrapper">
          <div v-for="chip of activeFilters" :key="chip.id" class="chip" :class="statusClass(chip.name, chip.type)">
            <div class="chip__icon">
              <i v-if="chip.type === 'Card Status'" class="i-layers" />
              <i v-if="chip.type === 'Approval Status'" class="i-mark" />
            </div>
            <div class="chip__name">{{ chip.name }}</div>
            <div class="chip__close" @click="removeChip(chip.id)"><i class="i-close" /></div>
          </div>
        </div>
      </div>
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
import Filter from '@/components/Yaro/Filter'

import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'FinancePage',
  components: {Card, Totals, Request, Label, Menu, Filter},
  data() {
    return {
      statusesChange: [
        {label: 'Not Started', command: () => this.changeStatus('Not Started')},
        {label: 'In Progress', command: () => this.changeStatus('In Progress')},
        {label: 'Done', command: () => this.changeStatus('Done')}
      ],
      status: 'In Progress',
      statusFilter: 'Good',
      statuses: ['No Status', 'Good', 'Recommended', 'Component Unsafe'],
      approvalStatuses: ['No Status', 'Approved By Customer', 'Approved By SA', 'Temporary Declined', 'Permanently Declined', 'Approved For Next Visit'],
      activeFilters: [],
      filtersList: [],
      allSelected: false,
      display: false
    }
  },
  async created() {
    const uid = this.$route.params.uid
    if (uid !== 'new') this.showRequests = true
    if (!this.showRequests) this.startOrder(true)
    const statusList = {
      name: 'Card Status',
      id: this.$getID(),
      mods: ['multiple'],
      list: [
        ...this.statuses.map((s, idx) => {
          return {name: s, id: idx + 1}
        })
      ]
    }
    const approvalStatusList = {
      name: 'Approval Status',
      id: this.$getID(),
      mods: ['multiple'],
      list: [
        ...this.approvalStatuses.map((s, idx) => {
          return {name: s, id: idx + 1}
        })
      ]
    }
    this.filtersList.push(statusList, approvalStatusList)
    this.activeFilters = this.filterParams || []
    await this.fetch()
    // await this.fetchRequests()
    if (this.$route.params.uid === 'tech-flow') this.changeStatusInTechFlow()
    if (this.$route.params.uid === 'tech-start') {
      this.changeStatusInTechStart()
      const activeFilters = [
        {
          name: 'Approved By Customer',
          id: 2,
          type: 'Approval Status'
        },
        {
          name: 'Permanently Declined',
          id: 5,
          type: 'Approval Status'
        },
        {
          name: 'Recommended',
          id: 3,
          type: 'Card Status'
        }
      ]
      this.activeFilters.push(...activeFilters)
      this.setFilter(activeFilters)
      this.fetch()

      this.changeRequestStatusInTechStart()
    }
  },
  beforeUnmount() {
    this.setFilter([])
  },
  computed: {
    ...mapState({
      cards: s => s.finance.cards,
      filterParams: s => s.finance.filterParams
    })
  },
  watch: {
    cards: {
      handler(cards) {
        this.allSelected = cards.every(c => c.select)
        if (this.cards.some(c => c.select)) this.display = true
        else this.display = false
      },
      deep: true
    },
    activeFilters(filters) {
      this.setFilter(filters)
      this.fetch()
    }
  },
  methods: {
    ...mapActions({
      fetch: 'finance/fetch'
    }),
    ...mapMutations({
      setFilter: 'finance/setFilter',
      setCard: 'finance/setCard',
      selectAll: 'finance/selectAll',
      deselectAll: 'finance/deselectAll',
      changeStatus: 'finance/changeAllStatus'
    }),
    changeStatus(status) {
      this.status = status
    },
    removeChip(id) {
      this.activeFilters = this.activeFilters.filter(c => c.id !== id)
    },
    labelClass(status) {
      return {
        '-orange': status === 'In Progress',
        '-none': status === 'Not Started',
        '-green': status === 'Done'
      }
    },
    statusClass(name, type) {
      return {
        '-orange -square': name === 'Recommended',
        '-red': name === 'Permanently Declined',
        '-red -square': name === 'Component Unsafe',
        '-bluegreen': name === 'Canned Service Completed' || name === 'Temporary Declined',
        '-none': name === 'No Status',
        '-none -square': name === 'No Status' && type === 'Card Status',
        '-green': name === 'Approved By SA',
        '-green -square': name === 'Good',
        '-green -border': name === 'Approved By Customer',
        '-purple': name === 'Approved For Next Visit'
      }
    },

    changeFilters() {}
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
