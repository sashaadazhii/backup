<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal">
        <div class="modal__main">
          <div class="modal__back" @click="close">
            <div class="modal__close"><i class="i-circle_close" /></div>
          </div>
          <div class="modal__icon"><i class="i-volume_up"></i></div>
          <div class="modal__info">
            <h2 class="modal__title">Hey, wait!</h2>
            <div class="modal__text">
              Are you sure, you want remove company
              <span class="modal__accent">{{ company.businessName }}</span>
              ?
            </div>
          </div>
        </div>
        <div class="modal__bottom">
          <div class="modal__text modal__text--left">
            Please type <span class="modal__accent"> {{ company.businessName }}</span>
            to confirm
          </div>
          <form class="form" @submit.prevent="removeCompany">
            <label class="field__label">
              <input class="field__input" type="text" placeholder="Company Name" v-model="companyName" />
            </label>
            <div class="btn-wrap">
              <button class="btn btn--fill" :class="{disabled: !isEqual}" :disabled="!isEqual">
                <span>Delete</span> <Loader :show="isLoading" color="#f37878" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import _ from 'lodash'
import Loader from '@/components/loader'

export default {
  name: 'DeleteCompanyModal',
  components: {Loader},

  data() {
    return {
      company: {},
      companyName: null,
      isLoading: false
    }
  },
  computed: {
    isEqual() {
      const companyName = this.company.businessName
      if (this.companyName === companyName) return true
      else return false
    }
  },
  methods: {
    ...mapActions({
      deleteCompany: 'superAdmin/companies/delete'
    }),
    ...mapMutations({
      remove: 'superAdmin/companies/remove'
    }),
    async beforeOpen(e) {
      this.company = _.cloneDeep(e.ref.params._rawValue)
    },
    async removeCompany() {
      try {
        this.isLoading = true
        if (this.isEqual) {
          this.$vfm.hide('DeleteCompanyModal')
          this.$vfm.hide('CompanyModal')
          await this.deleteCompany(this.company.id)
          this.remove(this.company.id)
        }
      } catch (err) {
        if (err.response.data.message === 'Company was not found') console.log('Company was not found')
        throw err
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
