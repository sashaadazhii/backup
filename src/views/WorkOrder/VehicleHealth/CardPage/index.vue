<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-title">Card {{ cards.findIndex(c => c.id === card.id) + 1 }}/{{ cards.length }}</div>
        <div class="modal__header-nav">
          <Button icon="i-keyboard_arrow_down" class="-grey" border iconSize="20px" @click="changeCard('dec')" />
          <Button icon="i-keyboard_arrow_up" class="-grey" border iconSize="20px" @click="changeCard('inc')" />
        </div>
        <div class="tech__list">
          <div v-for="(tech, idx) of card.techs" :key="idx" class="tech__label">{{ tech.firstName[0] }}{{ tech.lastName[0] }}</div>
          <Multiselect v-model="card.techs" :options="techList" dataKey="id">
            <template #menu>
              <div class="tech__add"><i class="i-add" /></div>
            </template>
            <template #option="{option}">
              <div class="y-dropdown-item-custom">{{ option.firstName }} {{ option.lastName }}</div>
            </template>
          </Multiselect>
        </div>
        <Label icon="i-time blue" iconSize="22px" :label="card.time" border circle size="large" class="-shadow" />
        <Button icon="i-circle_close" border circle iconSize="20px" size="small" @click="close" />
      </div>
      <div class="modal__main" :class="{'-full': block === 'Parts'}">
        <div class="modal__main-blocks blocks">
          <div v-if="block === 'General'" class="blocks__title">{{ card.name }}</div>
          <div v-if="block === 'General'" class="blocks__subtitle">
            {{ card.description }}
          </div>
          <!-- <div class="blocks__nav">
            <button class="blocks__btn" :class="{'-green': block === 'General'}" @click="block = 'General'">General</button>
            <button class="blocks__btn" :class="{'-green': block === 'Notes'}" @click="block = 'Notes'">Notes</button>
            <button class="blocks__btn" :class="{'-green': block === 'Service'}" @click="block = 'Service'">Service Tracking</button>
            <button class="blocks__btn" :class="{'-green': block === 'Warranty'}" @click="block = 'Warranty'">Warranty</button>
          </div> -->
          <div class="blocks__inner">
            <component :is="block" />
            <!-- <General /> -->
          </div>
        </div>
        <div v-if="block === 'General'" class="modal__main-requests">
          <div class="requests__row">
            <div class="requests__row-title">Card Status:</div>
            <Menu :list="statusesChange" :disabled="!isStart">
              <template #menu>
                <Label :label="card.status" size="small" class="requests__label -hover" :class="labelClass(card.status)" />
              </template>
            </Menu>
          </div>
          <div class="requests__row">
            <div class="requests__row-title">Customer Status:</div>
            <Label label="No status" size="small" class="requests__label -shadow -none" />
          </div>
          <div class="requests__row">
            <div class="requests__row-title">Approval Status:</div>
            <Label
              :label="card.approvalStatus"
              size="small"
              icon="i-rp_done"
              circle
              class="requests__label -shadow"
              :class="labelClass(card.approvalStatus)"
              iconSize="8px"
            />
          </div>
          <div class="requests__list">
            <div class="requests__list-title">Assigned Requests:</div>
            <div class="request__wrapper">
              <div class="request__header">
                <i class="i-device_hub" />
                <span>Noise</span>
              </div>
              <div class="request__row">
                <div class="request__row-title">Speed:</div>
                <div class="request__row-text">75 km/h</div>
              </div>
              <div class="request__row">
                <div class="request__row-title">While braking:</div>
                <div class="request__row-text -green">Yes</div>
              </div>
              <div class="request__row">
                <div class="request__row-title">Constant:</div>
                <div class="request__row-text -red">No</div>
              </div>
              <div class="request__tracker tracker">
                <div class="tracker__header">
                  <div class="tracker__header-cell">
                    <i class="i-time" />
                    <span>Est:</span>
                    <span>2h</span>
                  </div>
                  <div class="tracker__header-cell">
                    <span>Tracked:</span>
                    <span>1h 20min</span>
                  </div>
                </div>
                <div class="tracker__progress"><span class="-green" /><span class="-green" /><span class="-green" /><span /><span /></div>
              </div>
            </div>
            <div class="request__wrapper">
              <div class="request__header">
                <i class="i-device_hub" />
                <span>Vibrations</span>
              </div>
              <div class="request__row">
                <div class="request__row-title">Speed:</div>
                <div class="request__row-text">75 km/h</div>
              </div>
              <div class="request__row">
                <div class="request__row-title">While braking:</div>
                <div class="request__row-text -green">Yes</div>
              </div>
              <div class="request__row">
                <div class="request__row-title">Constant:</div>
                <div class="request__row-text -red">No</div>
              </div>
              <div class="request__tracker tracker">
                <div class="tracker__header">
                  <div class="tracker__header-cell">
                    <i class="i-time" />
                    <span>Est:</span>
                    <span>2h</span>
                  </div>
                  <div class="tracker__header-cell">
                    <span>Tracked:</span>
                    <span>1h 20min</span>
                  </div>
                </div>
                <div class="tracker__progress"><span class="-green" /><span class="-green" /><span class="-green" /><span /><span /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import Multiselect from '@/components/Yaro/Multiselect'
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'
import General from './General'
import Parts from './Parts'
import Notes from './Notes'
import Service from './Service'
import Warranty from './Warranty'
import Menu from '@/components/Yaro/Menu'

import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'CardPage',
  components: {Button, Label, General, Multiselect, Menu, Parts},
  data() {
    return {
      block: 'General',
      techs: null,
      statusesChange: [
        {label: 'No Status', command: () => this.changeStatus({id: this.card.id, status: 'No Status'})},
        {label: 'Good', command: () => this.changeStatus({id: this.card.id, status: 'Good'})},
        {label: 'Recommended', command: () => this.changeStatus({id: this.card.id, status: 'Recommended'})},
        {label: 'Component Unsafe', command: () => this.changeStatus({id: this.card.id, status: 'Component Unsafe'})}
      ],
      approvalStatusChange: [
        {label: 'No Status', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'No Status'})},
        {label: 'Approved By Customer', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Approved By Customer'})},
        {label: 'Approved By SA', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Approved By SA'})},
        {label: 'Temporary Declined', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Temporary Declined'})},
        {label: 'Permanently Declined', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Permanently Declined'})},
        {label: 'Approved For Next Visit', command: () => this.changeApprovalStatus({id: this.card.id, approvalStatus: 'Approved For Next Visit'})}
      ]
    }
  },
  computed: {
    ...mapState({
      techList: s => s.company.users.users.filter(u => u.role === 'technician'),
      card: s => s.company.cards.card,
      cards: s => s.company.cards.cards,
      isStart: s => s.workOrder.isStart,
      activeService: s => s.company.cannedServices.activeService
    })
  },
  watch: {
    // block() {
    // this.setActiveService({})
    // },
    activeService(s) {
      if (s.id) this.block = 'Parts'
      else this.block = 'General'
    }
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({
      setCard: 'company/cards/changeCard',
      changeStatus: 'company/cards/changeStatus',
      changeApprovalStatus: 'company/cards/changeApprovalStatus',
      setActiveService: 'company/cannedServices/setActiveService'
    }),
    labelClass(status) {
      return {
        '-orange': status === 'Recommended',
        '-red': status === 'Component Unsafe' || status === 'Permanently Declined',
        '-bluegreen': status === 'Canned Service Completed' || status === 'Temporary Declined',
        '-none': status === 'No Status',
        '-green': status === 'Approved By SA',
        '-green -border': status === 'Approved By Customer',
        '-purple': status === 'Approved For Next Visit',
        '-disabled': !this.isStart
      }
    },
    changeCard(param) {
      this.setCard(param)
      this.setActiveService({})
      this.block = 'General'
    }
  },
  beforeUnmount() {
    this.setActiveService({})
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
