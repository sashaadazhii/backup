<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__title">Manage Expense Accounts</div>
        <button class="modal__close" @click="close"><i class="i-circle_close" /></button>
      </div>
      <div class="modal__main">
        <div v-for="account in expenseAccounts" :key="account" class="modal__row">
          <div class="modal__row-desc">
            <div class="modal__row-icon"><div class="modal__row-circle" :style="{background: account.color}"></div></div>
            <div class="modal__row-text">{{ account.type }}</div>
          </div>
          <div class="modal__row-menu"><i class="i-more_horiz" /></div>
        </div>

        <div v-if="!isShowed" class="modal__footer">
          <Button label="Add one more Account" grey icon="i-add_circle" class="modal__btn y-button--center" @click="isShowed = !isShowed" />
        </div>
        <div v-else class="modal__colors">
          <Colors v-model="color" />
          <Input v-model.trim="type" placeholder="Enter Expense Title" :error="v$.type.$error" :errorMessage="errorMessage('type')" />
          <Button label="Cancel" size="large" border @click="isShowed = !isShowed" />
          <Button label="Save" size="large" center @click="add" />
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Button from '@/components/Yaro/Button'
import Colors from '@/components/Yaro/Colors'
import Input from '@/components/Yaro/Input'
import useVuelidate from '@vuelidate/core'
import {required, minLength, helpers} from '@vuelidate/validators'

export default {
  name: 'EditModal',
  components: {Button, Colors, Input},
  data() {
    return {
      v$: useVuelidate(),
      type: null,
      color: null,
      isShowed: false
    }
  },
  computed: {
    ...mapState({
      expenseAccounts: s => s.vendors.expensesTypes
    })
  },
  methods: {
    ...mapMutations({
      createExpensesType: 'vendors/createExpensesType'
    }),
    async add() {
      const result = await this.v$.$validate()
      if (!result) return
      else {
        const {type, color} = this
        const expensesType = {type, color}
        this.createExpensesType(expensesType)
      }
    },
    errorMessage(name) {
      const error = this.v$.$errors.find(err => err.$property === name)
      if (error) return error.$message
    }
  },
  validations() {
    return {
      type: {
        required: helpers.withMessage('Expense Account is required.', required),
        minLength: helpers.withMessage('Expense Account must have at least 3 letters.', minLength(3))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
