<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__title">Add New Markup</div>
        <button class="modal__close" @click="close"><i class="i-circle_close" /></button>
      </div>
      <div class="modal__main">
        <Dropdown v-model="type" :options="types" title="Type" :error="v$.type.$error" :errorMessage="errorMessage('type')">
          <template #value="{value}">
            <div class="y-dropdown-label-custom">
              <i class="i-layers" />
              <span v-if="value">{{ value }} </span>
              <span v-else class="-placeholder">Choose Type</span>
            </div>
          </template>
          <template #option="{option}">
            <div class="field__select-label">
              <span>{{ option }}</span>
            </div>
          </template>
        </Dropdown>
        <Input v-model.trim="style" title="Style" placeholder="Enter Style" :error="v$.style.$error" :errorMessage="errorMessage('style')" />

        <div class="modal__row">
          <Input v-model.trim="costs" title="Costs less than:" placeholder="< Enter Amount" :error="v$.costs.$error" :errorMessage="errorMessage('costs')" />
          <Input v-model.trim="markup" title="Markup" placeholder="Enter Amount" :error="v$.markup.$error" :errorMessage="errorMessage('markup')" />
          <!-- <Input
            v-model.trim="markup"
            title="Markup not less than:"
            placeholder="Enter Amount"
            :error="v$.markup.$error"
            :errorMessage="errorMessage('markup')"
          /> -->
        </div>
        <Dropdown v-model="status" :options="statuses" title="Status" :error="v$.status.$error" :errorMessage="errorMessage('status')">
          <template #value="{value}">
            <div class="y-dropdown-label-custom">
              <span class="circle"></span>
              <span v-if="value">{{ value }} </span>
              <span v-else class="-placeholder">Choose Status</span>
            </div>
          </template>
          <template #option="{option}">
            <div class="field__select-label">
              <span class="circle" :style="{background: option.color}"></span>
              <span>{{ option }}</span>
            </div>
          </template>
        </Dropdown>
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
  name: 'CreateMarkupModal',
  components: {Button, Input, Dropdown},
  data() {
    return {
      v$: useVuelidate(),
      type: null,
      style: null,
      costs: null,
      markup: null,
      status: null,
      types: ['Price & Service', 'Price & Service 2'],
      statuses: ['no status', 'no status 2']
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      add: 'company/markups/add'
    }),

    async createClose() {
      const result = await this.v$.$validate()
      if (!result) return
      const {type, style, costs, markup, status} = this
      const newMarkup = {type, style, costs, markup: +markup, status}
      this.add(newMarkup)
      this.$vfm.hide('CreateMarkupModal')
    },
    async createRepeat() {
      const result = await this.v$.$validate()
      if (!result) return
      const {type, style, costs, markup, status} = this
      const newMarkup = {type, style, costs, markup: +markup, status}
      this.add(newMarkup)
      this.type = this.style = this.costs = this.markup = this.status = null
      this.v$.$reset()
    },
    errorMessage(name) {
      const error = this.v$.$errors.find(err => err.$property === name)
      if (error) return error.$message
    }
  },
  validations() {
    return {
      type: {required: helpers.withMessage('Type is required.', required)},
      markup: {required: helpers.withMessage('Amount is required.', required), numeric},
      style: {required: helpers.withMessage('Style is required.', required)},
      costs: {required: helpers.withMessage('Costs is required.', required), numeric},
      status: {required: helpers.withMessage('Status is required.', required)}
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
