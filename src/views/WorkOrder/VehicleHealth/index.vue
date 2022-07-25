<template>
  <div class="page-inner" :class="{requests: showRequests}">
    <div v-if="showRequests" class="requests__wrapper">
      <Request v-for="request of requests" :key="request.uid" :request="request" />
    </div>
    <div class="health__wrapper">
      <div class="health__header">
        <div class="health__header-top">
          <Dropdown v-model="viewType" :options="viewTypes" size="medium" class="health__header-dropdown">
            <template #value="{value}">
              <div class="y-dropdown-item-custom">
                <i v-if="value === 'Card View'" class="i-view_module1 green" />
                <i v-else class="i-view_stream1 green" />
                <span>{{ value }} </span>
              </div>
            </template>
            <template #option="{option}">
              <div class="y-dropdown-label-custom">
                <i v-if="option === 'Card View'" class="i-view_module1 green" />
                <i v-else class="i-view_stream1 green" />
                <span>{{ option }}</span>
              </div>
            </template>
          </Dropdown>
          <Dropdown v-model="sortType" :options="sortTypes" size="medium" class="health__header-dropdown">
            <template #value="{value}">
              <div class="y-dropdown-item-custom">
                <i class="i-arrow-up-down" />
                <span>{{ value }} </span>
              </div>
            </template>
          </Dropdown>
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
          <Input size="medium" icon-left="i-search1" placeholder="Start typing to search card" />
          <Button label="Add Card from Library" icon="i-add_circle" @click="addCard" :disabled="viewOnly" />
        </div>
        <div v-if="activeFilters.length" class="chip__wrapper">
          <div v-for="chip of activeFilters" :key="chip.id" class="chip">
            <div class="chip__icon">
              <i v-if="chip.type === 'Card Status'" class="i-layers" />
              <i v-if="chip.type === 'Approval Status'" class="i-mark" />
            </div>
            <div class="chip__name">{{ chip.name }}</div>
            <div class="chip__close" @click="removeChip(chip.id)"><i class="i-close" /></div>
          </div>
        </div>
      </div>
      <div class="health__table table">
        <div class="table__header">
          <div class="y-check" :class="{'-active': allSelected, viewOnly}" @click="selectAll" />
          <div class="table__header-cell">Card status</div>
          <div class="table__header-cell">Card name</div>
          <div class="table__header-cell">Approval Status</div>
          <div class="table__header-cell">Service Tracking</div>
        </div>
        <div class="table__main">
          <Slot v-for="card of cards" :key="card.uid" :card="card" @click.self="openCard(card)" />
        </div>
      </div>
    </div>
    <Dialog v-model:visible="display" :dismissableMask="false" position="bottom" :closeOnEsc="false" :modal="false" draggable class="dialog__wrapper">
      <template v-slot="{initDrag}">
        <div class="dialog__inner">
          <div class="dialog__move" @mousedown="initDrag" @touchstart="initDrag"><i class="i-open_with" /></div>
          <div class="y-chips">{{ selectedCards.length }}</div>
          <div class="dialog__text">Cards Selected:</div>
          <div class="dialog__title">Change Card Status to</div>
          <Dropdown v-model="status" :options="statuses" size="medium" class="health__header-dropdown" theme="grey">
            <template #value="{value}">
              <div class="y-dropdown-item-custom --theme-grey">
                <i class="i-layers bluegreen" />
                <span>{{ value }} </span>
              </div>
            </template>
            <template #option="{option}">
              <div class="y-dropdown-label-custom --theme-grey">
                <i class="i-layers bluegreen" />
                <span>{{ option }}</span>
              </div>
            </template>
          </Dropdown>
          <div class="dialog__btns">
            <button class="dialog__btn" @click="save">Apply changes</button>
            <button class="dialog__btn dialog__btn--border" @click="close">Close</button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Request from './RequestComponent'
import Slot from './Slot'
import Dropdown from '@/components/Yaro/Dropdown'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import Dialog from '@/components/Yaro/Dialog'
import Filter from '@/components/Yaro/Filter'

import {mapState, mapMutations} from 'vuex'
import AddCard from './AddCard'
import CardPage from './CardPage'
export default {
  name: 'WorkOrderVehicleHealth',
  components: {Request, Dropdown, Button, Input, Slot, Dialog, Filter},
  data() {
    return {
      viewType: 'Table View',
      viewTypes: ['Table View', 'Card View'],
      sortType: 'Sort A-Z',
      sortTypes: ['Sort A-Z', 'Sort Z-A'],
      status: 'Good',
      statuses: ['No Status', 'Good', 'Recommended', 'Component Unsafe'],
      approvalStatuses: [
        'No Status',
        'Approved By Customer',
        'Approved By Service Advisor',
        'Temporary Declined',
        'Permanently Declined',
        'Approved For Next Visi'
      ],
      activeFilters: [],
      filtersList: [],
      requests: [
        {
          uid: '6c911945-183d-46d0-b79c-eb223f3b9cc5',
          status: 'Not Processed',
          customer: {
            firstName: 'Olaf',
            lastName: 'Scholz'
          },
          notes: 'Weird noise is at the back of the vehicle. It seems like some parts are not being connected.',
          estimatedTime: '2h',
          trackedTime: '1h 20min'
        },
        {
          uid: '6c911945-183d-46d0-b79c-eb223f3b9cc5',
          status: 'Not Processed',
          customer: {
            firstName: 'Olaf',
            lastName: 'Scholz'
          },
          notes: 'Weird noise is at the back of the vehicle. It seems like some parts are not being connected.',
          estimatedTime: '2h',
          trackedTime: '1h 20min'
        }
      ],
      allSelected: false,
      display: false,
      showRequests: false
    }
  },
  created() {
    const uid = this.$route.params.uid
    if (uid !== 'new') this.showRequests = true
    const statusList = {
      name: 'Card Status',
      id: this.$getID(),
      mods: ['multiple'],
      list: [
        ...this.statuses.map(s => {
          return {name: s, id: this.$getID()}
        })
      ]
    }
    const approvalStatusList = {
      name: 'Approval Status',
      id: this.$getID(),
      mods: ['multiple'],
      list: [
        ...this.approvalStatuses.map(s => {
          return {name: s, id: this.$getID()}
        })
      ]
    }
    this.filtersList.push(statusList, approvalStatusList)
  },
  computed: {
    ...mapState({
      cards: s => s.company.cards.cards,
      viewOnly: s => s.workOrder.viewOnly
    }),
    selectedCards() {
      return this.cards.filter(c => c.select)
    }
  },
  watch: {
    cards: {
      handler(cards) {
        this.allSelected = cards.every(c => c.select)
        if (this.cards.some(c => c.select)) this.display = true
        else this.display = false
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      selectAll: 'company/cards/selectAll',
      deselectAll: 'company/cards/deselectAll',
      changeStatus: 'company/cards/changeAllStatus'
    }),
    save() {
      this.changeStatus(this.status)
    },
    close() {
      this.display = false
      this.deselectAll()
      this.status = 'Good'
    },
    changeFilters({value}) {
      console.log(value)
    },
    removeChip(id) {
      this.activeFilters = this.activeFilters.filter(c => c.id !== id)
    },
    addCard() {
      if (this.viewOnly) return
      this.$vfm.show({
        component: AddCard,
        bind: {
          name: 'AddCard',
          'click-to-close': false
        }
      })
    },
    openCard(card) {
      this.$vfm.show(
        {
          component: CardPage,
          bind: {
            name: 'CardPage',
            'click-to-close': false,
            'esc-to-close': true
          }
        },
        card
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
