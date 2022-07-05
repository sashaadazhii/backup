<template>
  <div class="request__wrapper">
    <div class="request__header">
      <Label :label="request.status" border class="request__label" />
      <Label :alias="`${request.customer.firstName[0]}${request.customer.lastName[0]}`" circle />
    </div>
    <div class="request__main">
      <i class="i-device_hub request__main-icon" />
      <div class="request__main-title">Customer Request</div>
      <div class="request__main-text">{{ request.notes }}</div>
    </div>
    <div class="request__footer">
      <div class="request__footer-desc">
        <div class="request__footer-time">
          <i class="i-time" />
          <span>Est:</span>
          <span>{{ request.estimatedTime }}</span>
        </div>
        <div class="request__footer-time">
          <span>Tracked:</span>
          <span>{{ request.trackedTime }}</span>
        </div>
      </div>
      <div class="request__footer-progress">
        <span class="fill" />
        <span class="fill" />
        <span class="fill" />
        <span />
        <span />
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'

export default {
  name: 'VehicleRequest',
  components: {Label},
  props: {
    request: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
