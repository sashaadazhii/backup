<template>
  <div class="header__wrapper">
    <div class="header__inner">
      <div class="header__top" :class="{'-open': sidebarOpen}">
        <div class="header__icon"><i class="i-report" /></div>
        <div class="header__title">Reports</div>
      </div>
      <div class="header__bottom">
        <div class="header__nav">
          <router-link class="header__nav-link" to="/reports/sold-time">Sold Time</router-link>
          <router-link class="header__nav-link" to="/reports/new-customers">New Customers</router-link>
          <router-link class="header__nav-link" to="/reports/deferred-work">Deferred Work</router-link>
          <router-link class="header__nav-link" to="/reports/monthly-efficiency">Monthly Efficiency</router-link>
          <router-link class="header__nav-link" to="/reports/profit">Profit</router-link>
          <router-link class="header__nav-link" to="/reports/service-due">Service Due</router-link>
          <router-link class="header__nav-link" to="/reports/payroll-hours">Payroll Hours</router-link>
          <router-link class="header__nav-link" to="/reports/mark-up">Mark Up</router-link>
          <router-link class="header__nav-link" to="/reports/inventory">Inventory</router-link>
          <router-link class="header__nav-link" to="/reports/stocks">Stocks</router-link>
          <router-link class="header__nav-link" to="/reports/customer-sales-report">Customer Sales Report</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ReportsHeader',
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
