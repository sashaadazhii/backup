<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-top">
          <div class="modal__title">Add New Card</div>
          <div class="modal__close" @click="close"><i class="i-circle_close" /></div>
        </div>
        <div class="modal__header-bottom">
          <div class="modal__header-list">
            <button class="modal__header-item" :class="{active: component === 'CardGeneral', error: generalError}" @click="component = 'CardGeneral'">
              General
            </button>
            <button
              class="modal__header-item"
              :class="{
                active: component === 'CardRelation',
                error: v$.card.vehicleUID.$error || v$.card.relations.$error
              }"
              @click="component = 'CardRelation'"
            >
              Card Relation
            </button>
            <button
              class="modal__header-item"
              :class="{
                active: component === 'CardType',
                error: v$.card.odometerTrack.$error || v$.card.timeTrackLength.$error
              }"
              @click="component = 'CardType'"
            >
              Card Type
            </button>
          </div>
        </div>
      </div>
      <component :is="component" />
      <div class="modal__footer">
        <Button label="Save" @click="save" size="large" :loading="isLoading" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import CardGeneral from './CardGeneral'
import CardRelation from './CardRelation'
import CardType from './CardType'
import useVuelidate from '@vuelidate/core'
import {required, requiredIf, helpers} from '@vuelidate/validators'
import Button from '@/components/Yaro/Button'

export default {
  name: 'AddCardTemplateModal',
  components: {CardGeneral, CardRelation, CardType, Button},
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      component: 'CardGeneral'
    }
  },
  beforeUnmount() {
    this.reset()
  },
  computed: {
    ...mapState({
      card: s => s.company.card.card
    }),
    generalError() {
      if (!this.v$.$errors.length) return false
      const errors = this.v$.$errors.map(error => error.$property)
      const elementList = ['name', 'description']
      const error = elementList.some(el => errors.find(err => err === el))
      return error
    }
  },
  watch: {
    v$(val) {
      this.setErrors(val.$errors)
    }
  },
  methods: {
    ...mapActions({
      create: 'company/cardTemplates/add'
    }),
    ...mapMutations({
      setErrors: 'company/card/setErrors',
      setTemplate: 'company/cardTemplates/setTemplate',
      add: 'company/cardTemplates/add',
      reset: 'company/card/reset'
    }),
    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return
      const {name, description, cardType, cardRelationType} = this.card
      const card = {name, description, cardType, cardRelationType}
      if (this.card.descriptionForCustomer) card.descriptionForCustomer = this.card.descriptionForCustomer
      if (this.card.cardRelationType === 'custom-vehicles') {
        card.relations = this.card.relations.map(r => {
          const newCar = {make: r.make}
          if (r.model) newCar.model = r.model
          if (r.yearFrom) newCar.yearFrom = r.yearFrom
          if (r.yearTo) newCar.yearTo = r.yearTo
          return newCar
        })
      }
      if (this.card.cardRelationType === 'specific-vehicle') card.vehicleUID = this.card.vehicleUID
      if (this.card.cardType === 'maintenance' && this.card.odometerTrack) card.odometerTrack = this.card.odometerTrack
      if (this.card.cardType === 'maintenance' && this.card.timeTrackLength) card.timeTrackLength = this.card.timeTrackLength
      if (this.card.cardType === 'maintenance' && this.card.timeTrackLength) card.timeTrackType = this.card.timeTrackType

      try {
        this.isLoading = true
        const req = await this.create(card)
        // this.setTemplate(req)
        this.v$.$reset()
        this.reset()
        this.$vfm.hide('AddCardModal')
        // this.$router.push(`/inspection-builder/card/${req.templateID}`)
      } finally {
        this.isLoading = false
      }
    }
  },
  validations() {
    return {
      card: {
        name: {required},
        description: {required},
        vehicleUID: {requiredIf: requiredIf(() => this.card.cardRelationType === 'specific-vehicle')},
        relations: {
          requiredIf: requiredIf(() => this.card.cardRelationType === 'custom-vehicles'),
          $each: helpers.forEach({
            make: {requiredIf: requiredIf(() => this.card.cardRelationType === 'custom-vehicles')}
          })
        },
        odometerTrack: {requiredIf: requiredIf(() => this.card.cardType === 'maintenance' && !this.card.timeTrackLength)},
        timeTrackLength: {requiredIf: requiredIf(() => this.card.cardType === 'maintenance' && !this.card.odometerTrack)}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
