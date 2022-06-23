<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__top">
        <div class="header__icon"><i class="i-report" /></div>
        <div class="header__title">Reports</div>
      </div>
      <div class="header__bottom">
        <div class="header__nav">
          <router-link class="header__nav-link" to="/reports/sold-time">Sold Time</router-link>
          <router-link class="header__nav-link" to="/reports/new-customers">New Customers</router-link>
          <router-link class="header__nav-link" to="/reports/deferred-work">Deferred Work</router-link>
          <!-- <router-link class="header__nav-link" to="/reports/"></router-link> -->
          <!-- <router-link class="header__nav-link" to="/reports/"></router-link> -->
          <!-- <router-link class="header__nav-link" to="/reports/"></router-link> -->
          <!-- <router-link class="header__nav-link" to="/reports/"></router-link> -->
          <!-- <router-link class="header__nav-link" to="/reports/"></router-link> -->
          <!-- <router-link class="header__nav-link" to="/reports/"></router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportsHeader'
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
