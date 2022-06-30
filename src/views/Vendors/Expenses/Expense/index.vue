<template>
  <div class="table__row">
    <div class="table__cell table__cell--icon">
      <i class="i-calendar" />
      {{ expense.date }}
    </div>
    <div class="table__cell">{{ expense.part }}</div>
    <div
      class="table__cell label"
      :style="{
        color: color(expense.expenseAccount),
        borderColor: color(expense.expenseAccount)
      }"
    >
      <div
        class="label__bg"
        :style="{
          background: color(expense.expenseAccount)
        }"
      ></div>
      {{ expense.expenseAccount }}
    </div>
    <div class="table__cell">{{ formatter(expense.amount) }}</div>
    <div class="table__cell">{{ expense.hst.toFixed(2) }}</div>
    <!-- TODO: replace with Label -->
    <div class="table__cell label-square">{{ formatter(expense.billTotal) }}</div>
    <div class="table__cell">
      <Menu :list="actionsList" />
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Menu from '@/components/Yaro/Menu'

export default {
  name: 'ExpenseItem',
  props: {expense: {type: Object}},
  components: {Menu},
  data() {
    return {
      actionsList: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {}
        },
        {
          label: 'Delete',
          icon: 'i-remove_circle red',
          command: () => {}
        }
      ]
    }
  },
  computed: {
    ...mapState({
      expenseAccounts: s => s.vendors.expensesTypes
    })
  },
  methods: {
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    },
    color(exp) {
      const expenseAccounts = this.expenseAccounts.find(e => e.type === exp)
      return expenseAccounts.color
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
