<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__icon"><i class="i-volume_up" /></div>
      <div class="modal__title">Hey, wait!</div>
      <div class="modal__subtitle">
        Are you sure, you want to delete
        <span>{{ service.name }}</span>
        from the services?
      </div>
      <div class="modal__buttons">
        <button class="modal__button red" @click="deleteService">
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
      service: {},
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      delete: 'company/cannedServices/delete'
    }),
    ...mapMutations({
      remove: 'company/cannedServices/remove',
      removeFromTemplates: 'company/cardTemplates/removeService'
    }),
    beforeOpen(e) {
      this.service = e.ref.params._rawValue
    },
    async deleteService() {
      const {id, templateID} = this.service
      try {
        this.isLoading = true
        await this.delete({id, templateID})
        this.remove(id)
        this.removeFromTemplates(templateID)
        this.$vfm.hide('DeleteModal')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
