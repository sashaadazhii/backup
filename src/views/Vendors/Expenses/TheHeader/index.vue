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
          <div class="filter__icon"><i class="i-settings_menu" /></div>
        </div>
        <Button label="Add New Expense" size="small" icon="i-add_circle" class="filter__btn" @click="openModal" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import NewExpensesModal from '../NewExpenseModal'

export default {
  name: 'ExpensesHeader',
  components: {Button},
  methods: {
    openModal() {
      this.$vfm.show({
        component: NewExpensesModal,
        bind: {
          name: 'NewExpensesModal'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
