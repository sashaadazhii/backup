<template>
  <div class="page-inner requests">
    <div class="requests__wrapper">
      <Request v-for="request of requests" :key="request.uid" :request="request" />
    </div>
    <div class="health__wrapper">
      <div class="health__header">
        <div class="health__header-top">
          <Dropdown v-model="viewType" :options="viewTypes" size="medium" class="health__header-dropdown">
            <template #value="{value}">
              <div class="y-dropdown-item-custom">
                <i class="i-ballot green" />
                <span>{{ value }} </span>
              </div>
            </template>
            <template #option="{option}">
              <div class="y-dropdown-label-custom">
                <i class="i-ballot green" />
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
            <!-- <template #option="{option}">
            <div class="y-dropdown-label-custom">
              <i class="i-ballot green" />
              <span>{{ option }}</span>
            </div>
          </template> -->
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
            <!-- <template #optionlist="{option}">
            <div class="filter__option">
              <i v-if="option.name === 'Technitian'" class="i-build" />
              <i v-if="option.name === 'Service Advisor'" class="i-headset_mic" />
              <span>{{ option.name }}</span>
            </div>
          </template> -->
            <!-- <template #option="{option}">
            <div class="filter__option">
              <div class="filter__option--pin">{{ option.firstName[0] }}{{ option.lastName[0] }}</div>
              <span>{{ option.firstName }} {{ option.lastName }}</span>
            </div>
          </template> -->
          </Filter>
          <Input size="medium" icon-left="i-search1" placeholder="Start typing to search card" />
          <Button label="Add Card from Library" icon="i-add_circle" />
        </div>
        <div v-if="activeFilters.length" class="chip__wrapper">
          <div v-for="chip of activeFilters" :key="chip.id" class="chip">
            <div class="chip__icon">
              <i v-if="chip.type === 'Technitian'" class="i-build" />
              <i v-if="chip.type === 'Service Advisor'" class="i-headset_mic green" />
            </div>
            <div class="chip__name">{{ chip.name }}</div>
            <div class="chip__close" @click="removeChip(chip.id)"><i class="i-close" /></div>
          </div>
        </div>
      </div>
      <div class="health__table table">
        <div class="table__header">
          <div class="y-check" :class="{'-active': allSelected}" @click="selectAll" />
          <div class="table__header-cell">Card status</div>
          <div class="table__header-cell">Card name</div>
          <div class="table__header-cell">Approval Status</div>
          <div class="table__header-cell">Service Tracking</div>
        </div>
        <div class="table__main">
          <Slot v-for="card of cards" :key="card.uid" :card="card" />
        </div>
      </div>
    </div>
    <Dialog v-model:visible="display" :dismissableMask="false" position="bottom" :closeOnEsc="false" :modal="false" draggable>
      <div class="dialog__inner">
        <div class="y-chips">{{ selectedCards.length }}</div>
        <div class="dialog__title">selected</div>
        <div class="dialog__title">Change Status to</div>
        <Dropdown v-model="status" :options="statuses" size="medium" class="health__header-dropdown">
          <template #value="{value}">
            <div class="y-dropdown-item-custom">
              <i class="i-rp_done green" />
              <span>{{ value }} </span>
            </div>
          </template>
          <template #option="{option}">
            <div class="y-dropdown-label-custom">
              <i class="i-rp_done green" />
              <span>{{ option }}</span>
            </div>
          </template>
        </Dropdown>
        <Button label="Apply changes" @click="save" />
        <Button label="Cancel" @click="close" />
      </div>
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
      statuses: ['No Status', 'Good', 'Recommended', 'Component Unsafe', 'Canned Service Completed'],
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
      display: false
    }
  },
  created() {
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
      cards: s => s.company.cards.cards
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
      changeStatus: 'company/cards/changeStatus'
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
