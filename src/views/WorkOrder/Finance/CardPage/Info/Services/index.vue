<template>
  <div class="services__wrapper">
    <div class="services__header">
      <div class="services__title">Services</div>
      <Button label="Add Service" icon="i-add_circle" size="small" grey border />
    </div>
    <div class="services__list">
      <!-- <Service v-for="service of services" :key="service.id" :service="service" /> -->
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Button from '@/components/Yaro/Button'
// import Part from './Part'

export default {
  name: 'InfoServices',
  components: {Button},
  computed: {
    ...mapState({
      // services: s => s.finance.services
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
