<template>
  <div class="board__wrapper">
    <TheHeader @changeDay="changeDay" />
    <div v-if="day.type === 'Day'" class="board__inner">
      <div class="board__col-wrapper">
        <div class="board__col-title">
          Not Scheduled <span v-if="orders?.unscheduled" class="y-badge">{{ orders?.unscheduled.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.unscheduled" :key="order.uid" :order="order" @click="selectOrder(order)"  />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          To do <span v-if="orders?.todo" class="y-badge">{{ orders?.todo.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.todo" :key="order.uid" :order="order" @click="selectOrder(order)"  />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          In Progress <span v-if="orders?.inProgress" class="y-badge">{{ orders?.inProgress.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.inProgress" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          Done <span v-if="orders?.done" class="y-badge">{{ orders?.done.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.done" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
      </div>
    </div>
    <div v-if="day.type === 'Three Days'" class="board__inner -three">
      <div class="board__col-wrapper">
        <div class="board__col-title">
          {{ dayjs(day.date).format('DD MMM YYYY') }} <span v-if="orders?.unscheduled" class="y-badge">{{ orders?.unscheduled.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.unscheduled" :key="order.uid" :order="order" @click="selectOrder(order)"  />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          {{ dayjs(day.date).add(1, 'day').format('DD MMM YYYY') }} <span v-if="orders?.todo" class="y-badge">{{ orders?.todo.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.todo" :key="order.uid" :order="order" @click="selectOrder(order)"  />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          {{ dayjs(day.date).add(2, 'day').format('DD MMM YYYY') }}<span v-if="orders?.inProgress" class="y-badge">{{ orders?.inProgress.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.inProgress" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
      </div>
    </div>
    <div v-if="day.type === 'Five Days'" class="board__inner -five">
      <div class="board__col-wrapper">
        <div class="board__col-title">
          {{ dayjs(day.date).format('DD MMM YYYY') }} <span v-if="orders?.unscheduled" class="y-badge">{{ orders?.unscheduled.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.unscheduled" :key="order.uid" :order="order" @click="selectOrder(order)"  />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          {{ dayjs(day.date).add(1, 'day').format('DD MMM YYYY') }} <span v-if="orders?.todo" class="y-badge">{{ orders?.todo.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.todo" :key="order.uid" :order="order" @click="selectOrder(order)"  />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          {{ dayjs(day.date).add(2, 'day').format('DD MMM YYYY') }} <span v-if="orders?.inProgress" class="y-badge">{{ orders?.inProgress.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.inProgress" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          {{ dayjs(day.date).add(3, 'day').format('DD MMM YYYY') }} <span v-if="orders?.done" class="y-badge">{{ orders?.done.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.done" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
      </div>
      <div class="board__col-wrapper">
        <div class="board__col-title">
          {{ dayjs(day.date).add(4, 'day').format('DD MMM YYYY') }} <span v-if="orders?.done" class="y-badge">{{ orders?.done.length }}</span>
        </div>
        <div class="board__col-inner">
          <Card v-for="order of orders?.done" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import Card from './Card'
import {mapState, mapActions, mapMutations} from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'WorkOrderBoard',
  components: {Card, TheHeader},
  data() {
    return {
      dayjs,
      day: {type: 'Day'}
    }
  },
  async created() {
    await this.fetch()
    // await this.feetchStatuses()
    // await this.find()
    // await this.updateStatus({uid: '30751a8c-c5bf-456d-9032-aea569073d1a', params: {logicalStatus: 'in-progress'}})
    // await this.scheduleOrder({uid: '30751a8c-c5bf-456d-9032-aea569073d1a', params: {startsAt: '2022-05-23 05:20', endsAt: '2022-05-25 14:59'}})
  },
  computed: {
    ...mapState({
      orders: s => s.workOrder.workOrders
    })
  },
  methods: {
    ...mapActions({
      fetch: 'workOrder/fetchBoard',
      updateStatus: 'workOrder/updateStatus',
      scheduleOrder: 'workOrder/scheduleOrder',
      feetchStatuses: 'workOrder/status/fetch'
    }),
    ...mapMutations({
      set: 'workOrder/setOrder'
    }),
    selectOrder(order) {
      this.set(order)
      this.$router.push(`/work-order/${order.uid}/vehicle-health`)
    },
    changeDay(day) {
      this.day = day
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
