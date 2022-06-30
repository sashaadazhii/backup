<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__title">Add New Expenses</div>
        <button class="modal__close" @click="close"><i class="i-circle_close" /></button>
      </div>
      <div class="modal__main">
        <Dropdown
          v-model="expenseAccount"
          :options="expenseAccounts"
          title="Expense Account"
          placeholder="Choose Expense Account"
          :error="v$.expenseAccount.$error"
          :errorMessage="errorMessage('expenseAccount')"
        >
          <template #value="{value}">
            <div class="y-dropdown-label-custom">
              <i class="i-request_page" />
              <span v-if="value">{{ value }} </span>
              <span v-else class="-placeholder">Choose Expense Account</span>
            </div>
          </template>
        </Dropdown>
        <div class="modal__row">
          <!-- TODO: replace with Calendar -->
          <Dropdown v-model="date" :options="dates" title="Date" placeholder="Choose Date" :error="v$.date.$error" :errorMessage="errorMessage('date')">
            <template #value="{value}">
              <div class="y-dropdown-label-custom">
                <i class="i-calendar" />
                <span v-if="value">{{ value }} </span>
                <span v-else class="-placeholder">Choose Date</span>
              </div>
            </template>
          </Dropdown>
          <Input v-model.trim="amount" title="Amount" placeholder="Enter Amount" :error="v$.amount.$error" :errorMessage="errorMessage('amount')" />
        </div>
        <div class="modal__file-wrap">
          <div class="modal__file">
            <span class="modal__file-icon"><i class="i-add_circle" /></span><span class="modal__file-title">Attach File</span>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <Button label="Save & Close" border @click="createClose" />
        <Button label="Save & New" @click="createRepeat" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'
import Dropdown from '@/components/Yaro/Dropdown'

import useVuelidate from '@vuelidate/core'
import {required, helpers, numeric} from '@vuelidate/validators'

export default {
  name: 'NewExpensesModal',
  components: {Button, Input, Dropdown},
  data() {
    return {
      v$: useVuelidate(),
      expenseAccount: null,
      amount: null,
      date: null,
      expenseAccounts: ['Parts for Relase', 'Office Supplies', 'Meals for Stuff'],
      dates: ['1 Jul 2022', '2 Jul 2022', '3 Jul 2022', '4 Jul 2022', '5 Jul 2022']
      // TODO : add file
    }
  },
  methods: {
    ...mapMutations({
      createExpense: 'vendors/createExpense'
    }),

    async createClose() {
      const result = await this.v$.$validate()
      if (!result) return
      const {expenseAccount, amount, date} = this
      const expense = {expenseAccount, amount: +amount, date, hst: 0, billTotal: 300, part: 12987}
      this.createExpense(expense)
      this.$vfm.hide('NewExpensesModal')
    },
    async createRepeat() {
      const result = await this.v$.$validate()
      if (!result) return

      let {expenseAccount, amount, date} = this
      const expense = {expenseAccount, amount: +amount, date, hst: 20, billTotal: 490, part: 10342}
      this.createExpense(expense)
      this.expenseAccount = this.amount = this.date = null
      this.v$.$reset()
    },
    errorMessage(name) {
      const error = this.v$.$errors.find(err => err.$property === name)
      if (error) return error.$message
    }
  },
  validations() {
    return {
      expenseAccount: {required: helpers.withMessage('Expense Account is required.', required)},
      amount: {required: helpers.withMessage('Amount is required.', required), numeric},
      date: {required: helpers.withMessage('Date is required.', required)} // update when Calendar ready
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
