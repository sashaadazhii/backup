<template>
  <div class="board__wrapper">
    <TheHeader @changeDay="changeDay" />
    <div class="board__inner">
      <div class="board__header">
        <div v-for="(tech, idx) of techs" :key="idx" class="board__tech tech">
          <div class="tech__header">
            <span>{{ tech.firstName }} {{ tech.lastName }}</span>
            <div class="tech__label">3</div>
          </div>
          <div class="tech__body">
            <div class="tech__progress"><span style="width: 20%" /></div>
            <span>5.5/11 h</span>
          </div>
        </div>
      </div>
      <div class="board__body">
        <div class="board__col">
          <Card v-for="order of orders?.unscheduled" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
        <div class="board__col">
          <Card v-for="order of orders?.todo" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
        <div class="board__col">
          <Card v-for="order of orders?.inProgress" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
        <div class="board__col">
          <Card v-for="order of orders?.done" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
        <div class="board__col">
          <Card v-for="order of orders?.done" :key="order.uid" :order="order" @click="selectOrder(order)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from './HeaderInner'
import Card from './Card'
import {mapState, mapActions, mapMutations} from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'EmployeeProductivity',
  components: {Card, TheHeader},
  data() {
    return {
      // dayjs,
      // day: {type: 'Day'}
    }
  },
  async created() {
    await this.fetch()
    // console.log(this.tehcs)
    // console.log(this.orders)
    // await this.feetchStatuses()
    // await this.find()
    // await this.updateStatus({uid: '30751a8c-c5bf-456d-9032-aea569073d1a', params: {logicalStatus: 'in-progress'}})
    // await this.scheduleOrder({uid: '30751a8c-c5bf-456d-9032-aea569073d1a', params: {startsAt: '2022-05-23 05:20', endsAt: '2022-05-25 14:59'}})
  },
  computed: {
    ...mapState({
      orders: s => s.workOrder.workOrders,
      techs: s => s.company.users.users.filter(u => u.role === 'technician')
    })
  },
  methods: {
    ...mapActions({
      fetch: 'workOrder/fetchBoard'
      // updateStatus: 'workOrder/updateStatus',
      // scheduleOrder: 'workOrder/scheduleOrder',
      // feetchStatuses: 'workOrder/status/fetch'
    }),
    ...mapMutations({
      // set: 'workOrder/setOrder'
    }),
    selectOrder(order) {
      // this.set(order)
      // this.$router.push(`/work-order/${order.uid}/vehicle-health`)
    },
    changeDay(day) {
      // this.day = day
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
