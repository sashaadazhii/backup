<template>
  <div class="card">
    <div class="card__header">
      <div class="card__status">
        <i class="i-block" />
        <span>{{ order.logicalStatus }}</span>
      </div>
      <div class="card__dropdown">
        <i class="i-more_horiz" />
      </div>
    </div>
    <div class="card__main">
      <!-- <div class="card__date">
        <i class="i-calendar_stroke" />
        <span>17 Nov 11:00 AM — 17 Nov 1:40 PM</span>
      </div> -->
      <div class="card__tech">
        <i class="i-user" />
        <span>{{ order.customer.name }}</span>
      </div>
      <div class="card__tech">
        <i class="i-directions_car" />
        <span>{{ order.vehicle.make }} {{ order.vehicle.model }}</span>
      </div>
    </div>

    <!-- <div class="card__footer">
      <div class="card__footer-left">
        <div class="card__requests">
          <i class="i-request" />
          <span>4 Requests</span>
        </div>
      </div>
      <div class="card__footer-right">
        <div class="card__assign">
          <span>DM</span>
        </div>
        <div class="card__assign">
          <span class="green">AM</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'WorkOrderCard',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
