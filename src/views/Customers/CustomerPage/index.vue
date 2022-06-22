<template>
  <div class="page-inner">
    <TheHeader />
    <div class="customers__wrapper">
      <Customer />
      <Vehicle />
    </div>
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import Customer from './CustomerComponent'
import Vehicle from './VehiclesComponent'

export default {
  name: 'CustomerPage',
  components: {TheHeader, Customer, Vehicle}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
