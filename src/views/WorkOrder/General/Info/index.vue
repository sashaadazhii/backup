<template>
  <div class="block__wrapper">
    <div class="block__title">customer info</div>
    <div class="block__subtitle">Customer</div>
    <div class="block__row">
      <i class="i-customers" />
      <span>{{ order.customer.name }}</span>
    </div>
    <div class="block__subtitle">Vehicle</div>
    <div class="block__row">
      <i class="i-directions_car" />
      <span>{{ order.vehicle.make }} {{ order.vehicle.model }} {{ order.vehicle.year }} </span>
    </div>
    <div class="block__title">Contacts</div>
    <div class="block__subtitle">Contact/Follow up</div>
    <div class="block__row block__row--label">
      <span>{{ order.customer.firstName }}</span>
      <Label class="block__row-label" icon="i-phone bluegreen" :label="order.customer.cellPhones[0]" border />
    </div>
    <div v-if="order.customer.cellPhones.length > 1" class="block__row block__row--label">
      <span>{{ order.customer.firstName }}</span>
      <Label class="block__row-label" icon="i-phone blue" :label="order.customer.cellPhones[1]" border />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Label from '@/components/Yaro/Label'

export default {
  name: 'WorkOrderGeneralInfo',
  components: {Label},
  computed: {
    ...mapState({
      order: s => s.workOrder.localOrder
    })
  },
  created() {
    console.log(this.order)
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
