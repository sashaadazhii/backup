<template>
  <div class="order-layout layout" :class="{'is-header': headerName === 'WorkOrder'}">
    <Header v-if="headerName === 'WorkOrder'" />
    <div class="page-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './Header'

export default {
  name: 'orderLayout',
  components: {Header},
  computed: {
    headerName() {
      return this.$route.meta.header
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
