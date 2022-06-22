<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__icon"><i class="i-volume_up" /></div>
      <div class="modal__title">Hey, wait!</div>
      <div class="modal__subtitle">
        Are you sure, you want to delete
        <span>{{ customer.firstName }} {{ customer.lastName }}</span>
        from the customers?
      </div>
      <div class="modal__buttons">
        <button class="modal__button red" @click="deleteCustomer">
          <span>Delete</span>
          <Loader :show="isLoading" color="#f37878" />
        </button>
        <button class="modal__button" @click="close">Cancel</button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import Loader from '@/components/loader'

export default {
  name: 'DeleteModal',
  components: {Loader},
  data() {
    return {
      customer: {},
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      delete: 'company/customers/delete'
    }),
    ...mapMutations({
      remove: 'company/customers/remove'
    }),
    beforeOpen(e) {
      this.customer = e.ref.params._rawValue
    },
    async deleteCustomer() {
      try {
        this.isLoading = true
        await this.delete(this.customer.uid)
        this.remove(this.customer.uid)
      } finally {
        this.isLoading = false
        this.$vfm.hide('DeleteModal')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
