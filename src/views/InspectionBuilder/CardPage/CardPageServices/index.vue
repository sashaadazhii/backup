<template>
  <div class="services__wrapper">
    <div v-if="services.length" class="services__inner">
      <div class="services__inner-header">
        <div class="services__empty-btn" @click="openModal">
          <i class="i-add_circle" />
          <span>Create Canned Service</span>
        </div>
      </div>
      <div class="services__inner-main">
        <CannedService v-for="(service, idx) of services" :key="idx" :service="service" />
      </div>
    </div>
    <div v-else class="services__empty">
      <div class="services__empty-block">
        <div class="services__empty-title">Create Canned Service</div>
        <div class="services__empty-text">
          Service includes a visual inspection of the brake system, replacement with new fluid that meets or exceeds
          your vehicle manufacturer’s specifications and proper disposal of the used fluid.
        </div>
        <div class="services__empty-btn" @click="openModal">
          <i class="i-add_circle" />
          <span>Create Canned Service</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CannedService from './CannedService'
import NewCannedService from './NewCannedServiceModal'
import {mapState} from 'vuex'

export default {
  name: 'CardTemplateCannedServices',
  components: {CannedService},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      services: s => s.company.cannedServices.services
    })
  },
  methods: {
    openModal() {
      this.$vfm.show(
        {
          component: NewCannedService,
          bind: {
            name: 'AddCannedServiceModal'
          }
        },
        this.customer
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
