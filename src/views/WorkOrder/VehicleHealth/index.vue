<template>
  <div class="page-inner" :class="{requests: showRequests && requests.length}">
    <div v-if="showRequests && requests.length" class="requests__wrapper">
      <Request v-for="request of requests" :key="request.id" :request="request" :isViewOnlyMode="isViewOnlyMode" />
    </div>
    <div class="health__wrapper">
      <div class="health__header">
        <div class="health__header-top">
          <Dropdown :modelValue="sortType" :options="sortTypes" size="medium" class="health__header-dropdown" @change="changeSort">
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
          <Input :modelValue="searchValue" size="medium" icon-left="i-search1" placeholder="Start typing to search card" @input="changeSearch" />
          <!-- <Button label="Add Card from Library" icon="i-add_circle" @click="addCard" :disabled="!isStart || isViewOnlyMode" /> -->
          <Button label="Add Card from Library" icon="i-add_circle" @click="addCard" :disabled="!isStart" />
        </div>
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
      <div class="health__table table">
        <!-- <div class="table__header" :class="{'-check': isStart}">
          <div class="y-check" :class="{'-active': allSelected, '-hide': !isStart }" @click="selectAll" />
          <div class="table__header-cell">Card status</div>
          <div class="table__header-cell">Card name</div>
          <div class="table__header-cell">Approval Status</div>
          <div class="table__header-cell">Service Tracking</div>
        </div> -->
        <div class="table__header" :class="{'-check': isStart && isReady}">
          <div class="y-check" :class="{'-active': allSelected, '-hide': !isStart || !isReady}" @click="selectAll" />
          <div class="table__header-cell">Card status</div>
          <div class="table__header-cell">Card name</div>
          <div class="table__header-cell">Approval Status</div>
          <div class="table__header-cell">Service Tracking</div>
        </div>

        <div class="table__main">
          <div v-if="initialWalkaround" class="card__wrapper small" :class="{'-check': isStart}" @click="open">
            <!-- <div v-if="isStart" /> -->
            <Label label="Completed" size="small" class="card__label" />
            <div class="card__title">Initial Walkaround</div>
          </div>

          <Slot v-for="card of cards" :key="card.uid" :card="card" :isViewOnlyMode="isViewOnlyMode" class="inner" @click.self="openCard(card)" />
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
                <i class="i-layers" :class="iconColor(value)" />
                <span>{{ value }} </span>
              </div>
            </template>
            <template #option="{option}">
              <div class="y-dropdown-label-custom --theme-grey">
                <i class="i-layers" :class="iconColor(option)" />
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
import InitialWalkaround from './InitialWalkaround'
import Slot from './Slot'
import Dropdown from '@/components/Yaro/Dropdown'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import Dialog from '@/components/Yaro/Dialog'
import Filter from '@/components/Yaro/Filter'
import Label from '@/components/Yaro/Label'
import {mapState, mapMutations, mapActions} from 'vuex'
import AddCard from './AddCard'
import CardPage from './CardPage'
export default {
  name: 'WorkOrderVehicleHealth',
  components: {Request, Dropdown, Button, Input, Slot, Dialog, Filter, Label},
  data() {
    return {
      viewType: 'Table View',
      viewTypes: ['Table View', 'Card View'],
      sortTypes: ['Sort A-Z', 'Sort Z-A'],
      status: 'Good',
      statuses: ['No Status', 'Good', 'Recommended', 'Component Unsafe'],
      // approvalStatuses: ['No Status', 'Approved By Customer', 'Approved By SA', 'Temporary Declined', 'Permanently Declined', 'Approved For Next Visit'],
      approvalStatuses: ['No Status', 'Approved By SA'],
      activeFilters: [],
      filtersList: [],
      allSelected: false,
      display: false,
      showRequests: false,
      bin: null
      // isReady: false
    }
  },
  async created() {
    const uid = this.$route.params.uid
    if (uid !== 'new') this.showRequests = true
    // if (!this.showRequests) this.startOrder(true)
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
    await this.fetchRequests()
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
  beforeMount() {
    if (this.$route.params.uid === 'new') {
      this.changeStatusInTechFlow()
    }
  },
  beforeUnmount() {
    this.setFilter([])
  },
  computed: {
    ...mapState({
      localCards: s => s.company.cards.cards,
      searchValue: s => s.company.cards.searchValue,
      sortType: s => s.company.cards.sortType,
      filterParams: s => s.company.cards.filterParams,
      isStart: s => s.workOrder.isStart,
      initialWalkaround: s => s.workOrder.initialWalkaround,
      localRequests: s => s.requests.requests,
      order: s => s.workOrder.workOrder
    }),
    requests() {
      return this.order.customerRequests && this.order.customerRequests.length > 0 ? this.order.customerRequests : []
    },
    cards() {
      return this.order?.cards && this.order?.cards.length > 0 ? this.order.cards : this.localCards
    },
    isViewOnlyMode() {
      if (!!this.order?.uid) {
        return this.$route.params.uid === this.order.uid
      }
      return false
    },
    selectedCards() {
      return this.cards.filter(c => c.select)
    },
    isReady() {
      let ready
      if (this.order.uid) {
        ready = this.order && this.order.customerRequests?.filter(r => r.status === 'Not Processed').length === 0 ? true : false
        return ready
      } else return false
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
    },
    activeFilters(filters) {
      this.setFilter(filters)
      this.fetch()
    }
  },
  methods: {
    ...mapActions({
      fetch: 'company/cards/fetch',
      fetchRequests: 'requests/fetch'
    }),
    ...mapMutations({
      setSort: 'company/cards/setSort',
      setSearch: 'company/cards/setSearch',
      setFilter: 'company/cards/setFilter',
      setCard: 'company/cards/setCard',
      selectAll: 'company/cards/selectAll',
      deselectAll: 'company/cards/deselectAll',
      changeStatus: 'company/cards/changeAllStatus',
      startOrder: 'workOrder/startOrder',
      changeStatusInTechFlow: 'company/cards/changeApprovalStatusInTechFlow',
      changeStatusInTechStart: 'company/cards/changeApprovalStatusInTechStart',
      changeRequestStatusInTechStart: 'requests/changeStatusInTechStart',
    }),
    save() {
      this.changeStatus(this.status)
    },
    close() {
      this.display = false
      this.deselectAll()
      this.status = 'Good'
    },
    changeSort({value}) {
      this.setSort(value)
      this.fetch()
    },
    changeFilters() {},
    removeChip(id) {
      this.activeFilters = this.activeFilters.filter(c => c.id !== id)
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
      this.$vfm.show(
        {
          component: CardPage,
          bind: {
            name: 'CardPage',
            'click-to-close': false,
            'esc-to-close': true
          }
        },
        this.isReady
      )
    },
    changeSearch(searchValue) {
      this.setSearch(searchValue)
      this.fetch()
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
    iconColor(status) {
      const colorsMapByStatus = {
        ['No Status']: 'none square',
        ['Good']: 'green square',
        ['Recommended']: 'orange square',
        ['Component Unsafe']: 'red square'
      }
      return colorsMapByStatus[status]
    },
    open() {
      this.$vfm.show({
        component: InitialWalkaround,
        bind: {
          name: 'InitialWalkaround',
          'esc-to-close': true
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
