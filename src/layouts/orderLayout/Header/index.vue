<template>
  <div class="header__wrapper">
    <div class="header__title">
      <span v-if="isNew">Create new Work Order</span>
      <Label
        v-else-if="!isNew && !isAdvisor"
        :label="order.customStatus?.name || order.logicalStatus"
        size="small"
        :color="order.logicalStatus === 'In Progress' ? '#FF9B70' : '#40C79A'"
        :circle="order.logicalStatus !== 'In Progress' ? true : false"
        :class="statusClass(order.logicalStatus)"
        :icon="statusIcon(order.logicalStatus)"
      />
      <span v-else></span>

      <span v-if="!isNew">Work Order</span>
      <Label v-if="order.vehicleInShop" class="header__label" icon="i-directions_car" border iconSize="18px" size="large" />
      <Label v-if="order.talkSA" class="header__label" icon="i-help" border iconColor="#FF9B70" iconSize="18px" size="large" />
      <Label v-if="order.partsOrdered" class="header__label" icon="i-build" border iconColor="#6B7280" iconSize="18px" size="large" />
      <Label v-if="isAdvisor" label="To Do" color="#3EB3BB" />
    </div>
    <div class="header__nav">
      <router-link v-if="uid === 'new'" class="header__nav-link" :to="`/work-order/${uid}/general`">General </router-link>
      <router-link class="header__nav-link" :to="`/work-order/${uid}/vehicle-health`" :class="{active: isAdvisor}">Vehicle Health</router-link>
      <router-link class="header__nav-link" :to="`/work-order/${uid}/vehicle-info`">Vehicle Info</router-link>
    </div>
    <div v-if="isNew" class="header__menu">
      <router-link :to="'/work-orders/board'">
        <Button label="Cancel" border grey />
      </router-link>
      <router-link :to="'/work-orders/board'">
        <Button @click="saveNewOrder" label="Save" />
      </router-link>
    </div>
    <div v-else class="header__menu">
      <Label v-if="!isStart" icon="i-lock orange" label="View Only" border class="-orange" size="large" />
      <div v-if="!isStart" class="header__timer" :class="{'-start': isStart}" @click="start">
        <div v-if="!isStart" class="header__timer-start"><i class="i-play_circle_filled" /> <span>Start Work Order</span></div>
      </div>

      <div v-if="isStart && !isReady && isAdvisor"></div>
      <div v-else-if="isStart && !isReady && cardsApproved && !isAdvisor">
        <router-link :to="`/service-advisor/${uid}`">
          <Button label="Ready for Service Advisor Review" icon="i-check_circle" class="mint" color="#10B981" />
        </router-link>
      </div>

      <div v-else-if="isStart && isReady && isAdvisor">
        <router-link :to="`/service-advisor/${uid}/preview`">
          <Button label="Send for customer approval" icon="i-check_circle" class="mint" color="#10B981" />
        </router-link>
      </div>
      <Button icon="i-circle_close" border circle size="small" @click="close" />
    </div>
  </div>
</template>

<script>
import Mileage from './Mileage'
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'
import {mapState, mapMutations, mapActions} from 'vuex'
import {uuidv4} from '@/utils/helpers'

export default {
  name: 'OrderHeader',
  components: {Button, Label},
  data() {
    return {
      uid: this.$route.params.uid,
      isNew: true,
      isFlow: false,
      cardsApproved: false
    }
  },
  async created() {
    if (this.uid !== 'new') this.isNew = false
    await this.fetch()
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder,
      cards: s => s.company.cards.cards,
      isStart: s => s.workOrder.isStart
    }),
    isReady() {
      return this.order?.cannedServices.filter(s => s.advisorApprove).length === this.order?.cannedServices.length ? true : false
    },
    isAdvisor() {
      return this.$route.name == 'SAView' ? true : false
    }

    //   isReady() {
    //   if (this.order.customerRequests.filter(r => r.status === 'Not Processed').length === 0) {
    //     return true
    //   } else return false
    // }
  },
  watch: {
    cards: {
      handler(cards) {
        let statuses = cards.map(c => c.status)
        if (cards.every(c => c.status === 'Good')) this.cardsApproved = false
        else if (statuses.includes('No Status')) this.cardsApproved = false
        else this.cardsApproved = true
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      startOrder: 'workOrder/startOrder',
      addNewWorkOrder: 'workOrder/addNewOrder',
      updateOrder: 'workOrder/updateOrder'
    }),
    ...mapActions({
      fetch: 'company/cards/fetch',
      findOrder: 'workOrder/find'
    }),
    saveNewOrder() {
      const formattedOrderToSave = {
        ...this.order,
        uid: uuidv4(),
        customer: {
          uid: this.order.customer?.uid || '',
          name: `${this.order.customer?.firstName} ${this.order.customer?.lastName}` || ''
        },
        vehicle: {
          uid: this.order.vehicle?.uid || '',
          make: this.order.vehicle?.make || '',
          model: this.order.vehicle?.model || '',
          year: this.order.vehicle?.year || '',
          currentOdometer: Math.floor(Math.random() * 300000)
        },
        serviceAdvisor: {
          companyID: this.order.serviceAdvisor?.companyID || '',
          email: this.order.serviceAdvisor?.email || '',
          id: this.order.serviceAdvisor?.id || '',
          name: `${this.order.serviceAdvisor?.firstName} ${this.order.serviceAdvisor?.lastName}` || '',
          alias: `${this.order.serviceAdvisor?.firstName.charAt(0)}${this.order.serviceAdvisor?.lastName.charAt(0)}` || '',
          role: this.order.serviceAdvisor?.role || ''
        },
        technician: {
          companyID: this.order.technician?.companyID || '',
          email: this.order.technician?.email || '',
          id: this.order.technician?.id || '',
          name: `${this.order.technician?.firstName} ${this.order.technician?.lastName}` || '',
          alias: `${this.order.technician?.firstName.charAt(0)}${this.order.technician?.lastName.charAt(0)}` || '',
          role: this.order.technician?.role || ''
        },
        customerRequests: this.order?.customerRequests || [],
        scheduling: {
          allTime: `${this.order?.customerRequests?.reduce((n, {time}) => n + time, 0)} h` || ''
        },
        startsAt: this.order?.timeComing || '',
        endsAt: this.order?.timePromised || '',
        logicalStatus: 'Not Started',
        customerCards: this.cards,
        cannedServices: []
      }
      this.addNewWorkOrder(formattedOrderToSave)
    },
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
          name: 'Mileage'
        }
      })
    },
    async start() {
      this.isStart = !this.isStart
      this.startOrder(true)
      this.order.logicalStatus = 'In Progress'
      this.updateOrder(this.order)
      if (this.isStart) this.open()

      if (this.$route.params.uid) {
        this.uid = this.$route.params.uid
        await this.findOrder(this.uid)
      }
    },
    close() {
      this.$confirm.require({
        title: 'Hey, wait!',
        message: `Are you sure, you want to close work order?`,
        acceptLabel: 'Close',
        rejectLabel: 'Cancel',
        icon: 'i-volume_up',
        accept: async () => {
          this.startOrder(false)
          this.order.logicalStatus = 'Not Started'
          this.updateOrder(this.order)
          this.$router.push('/work-orders/board')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
