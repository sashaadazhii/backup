<template>
  <div class="header__wrapper">
    <div class="filter-wrap">
      <div class="filter__left">
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

      <!-- <Button icon="i-print" border class="reports__btn--icon" /> -->
      <!-- <Button icon="i-email" border class="reports__btn--icon" /> -->
      <!-- <Button icon="i-save_alt" border label="Export Report" class="reports__btn" /> -->
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'

export default {
  name: 'ReportsHeader'
  // components: {Button}
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
