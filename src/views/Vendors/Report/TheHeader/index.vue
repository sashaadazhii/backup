<template>
  <div class="header__wrapper">
    <div class="filter-wrap">
      <div class="filter__left">
        <div class="filter">
          <div class="filter__title">Vendor:</div>
          <div class="filter__text">All</div>
          <div class="filter__icon"><i class="i-keyboard_arrow_down" /></div>
        </div>
        <div class="filter">
          <div class="filter__title">Time Period:</div>
          <div class="filter__text">This month</div>
          <div class="filter__icon"><i class="i-keyboard_arrow_down" /></div>
        </div>
        <div class="filter">
          <div class="filter__title">Date range:</div>
          <div class="filter__icon"><i class="i-calendar" /></div>
          <div class="filter__text">1 Jul 2022 ~ 6 Jul 2022</div>
          <div class="filter__icon"><i class="i-keyboard_arrow_down" /></div>
        </div>
        <div class="filter">
          <div class="filter__title">Display by:</div>
          <div class="filter__text">Day</div>
          <div class="filter__icon"><i class="i-keyboard_arrow_down" /></div>
        </div>
      </div>
      <div class="filter__right">
        <div class="filter filter--light">
          <div class="filter__icon"><i class="i-print" /></div>
        </div>
        <div class="filter filter--light">
          <div class="filter__icon"><i class="i-email" /></div>
        </div>
        <div class="filter">
          <div class="filter__icon"><i class="i-save_alt" /></div>
          <div class="filter__title">Export Report</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportHeader'
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
