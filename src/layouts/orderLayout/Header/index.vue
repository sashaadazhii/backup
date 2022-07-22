<template>
  <div class="header__wrapper">
    <div class="header__title">
      <span v-if="isNew">Create new Work Order</span>
      <Label
        v-else
        :label="order.customStatus?.name || order.logicalStatus"
        size="small"
        :color="order.customStatus?.color"
        circle
        :class="statusClass(order.logicalStatus)"
        :icon="statusIcon(order.logicalStatus)"
      />
      <span v-if="!isNew">Work Order</span>
      <Label v-if="order.vehicleInShop" class="header__label" icon="i-directions_car" border iconSize="18px" size="large" />
      <Label v-if="order.talkSA" class="header__label" icon="i-help" border iconColor="#FF9B70" iconSize="18px" size="large" />
      <Label v-if="order.partsOrdered" class="header__label" icon="i-build" border iconColor="#6B7280" iconSize="18px" size="large" />
    </div>
    <div class="header__nav">
      <router-link v-if="uid === 'new'" class="header__nav-link" :to="`/work-order/${uid}/general`">General</router-link>
      <router-link class="header__nav-link" :to="`/work-order/${uid}/vehicle-health`">Vehicle Health</router-link>
      <router-link class="header__nav-link" :to="`/work-order/${uid}/vehicle-info`">Vehicle Info</router-link>
      <router-link v-if="uid === 'new'" class="header__nav-link" :to="`/work-order/${uid}/finance`">Finance</router-link>
    </div>
    <div v-if="isNew" class="header__menu">
      <router-link class="header__nav-link" :to="'/work-orders/board'"><Button label="Cancel" border grey /></router-link>
      <Button label="Save" />
    </div>
    <div v-else class="header__menu">
      <Label v-if="!isStart" icon="i-lock orange" label="View Only" border class="-orange" size="large" />
      <div class="header__timer" :class="{'-start': isStart}" @click="start">
        <div v-if="!isStart" class="header__timer-start"><i class="i-play_circle_filled" /> <span>Start Work Order</span></div>
        <div v-else class="header__timer-stop"><i class="i-power_settings_new red" /> <span>00:05</span></div>
      </div>
      <router-link :to="'/work-orders/board'"><Button icon="i-circle_close" border circle size="small" /></router-link>
    </div>
  </div>
</template>

<script>
import Mileage from './Mileage'
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'
import {mapState} from 'vuex'

export default {
  name: 'OrderHeader',
  components: {Button, Label},
  data() {
    return {
      uid: this.$route.params.uid,
      isNew: this.uid === 'new',
      isStart: false
    }
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder
    })
  },
  methods: {
    statusClass(status) {
      return {
        card__status: true,
        '-none': status === 'Not Scheduled',
        '-grey': status === 'Not Started'
      }
    },
    statusIcon(status) {
      switch (status) {
        case 'Not Scheduled':
          return 'i-rp_not_scheduled'
        case 'To Do':
          return 'i-rp_to_do'
        case 'Not Started':
          return 'i-rp_not_started'
        case 'In Progress':
          return 'i-rp_in_progress'
        case 'Done':
          return 'i-rp_done'
      }
    },
    open() {
      this.$vfm.show({
        component: Mileage,
        bind: {
          name: 'Mileage',
          'esc-to-close': true
        }
      })
    },
    start() {
      this.isStart = !this.isStart
      if (this.isStart) this.open()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
