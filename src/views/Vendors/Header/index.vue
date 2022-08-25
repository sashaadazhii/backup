<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__top" :class="{'-open': sidebarOpen}">
        <div class="header__icon"><i class="i-report" /></div>
        <div class="header__title">Vendors</div>
      </div>
      <div class="header__bottom">
        <div class="header__nav">
          <router-link class="header__nav-link" to="/vendors/main">Vendors</router-link>
          <router-link class="header__nav-link" to="/vendors/expenses">Vendor Expenses</router-link>
          <router-link class="header__nav-link" to="/vendors/report">Vendor Report</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'VendorsHeader',
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
