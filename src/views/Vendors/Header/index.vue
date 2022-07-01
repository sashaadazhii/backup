<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__top">
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
export default {
  name: 'VendorsHeader'
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
