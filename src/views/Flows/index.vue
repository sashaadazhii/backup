<template>
  <div class="flow__wrapper">
    <div class="flow__header"  :class="{'-open': sidebarOpen}">
      <i class="i-open_with"></i>
      <span>Flows</span>
    </div>
    <div class="flow__inner">
      <div class="flow__links">
        <div class="flow__link">
          <span>Work Order Technician Flow</span>
          <i class="i-arrow_forward" />
        </div>
        <div class="flow__link">
          <span>Service Advisor Review Flow</span>
          <i class="i-arrow_forward" />
        </div>
        <div class="flow__link">
          <span>Customer Approval Flow</span>
          <i class="i-arrow_forward" />
        </div>
        <div class="flow__link">
          <span>Ordering Parts Flow</span>
          <i class="i-arrow_forward" />
        </div>
        <div class="flow__link">
          <span>Technician Starts Work Flow</span>
          <i class="i-arrow_forward" />
        </div>
        <div class="flow__link">
          <span>Service Advisor Invoicing and Billing Flow</span>
          <i class="i-arrow_forward" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Flows',
  computed: {
    ...mapState({
      sidebarOpen: s => s.modules.sidebarOpen
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
