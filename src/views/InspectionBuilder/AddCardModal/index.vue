<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-top">
          <div class="modal__title">Create New Card</div>
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
                active: component === 'CardAdditional',
                error: additionalError
              }"
              @click="component = 'CardAdditional'"
            >
              Additional
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
import CardAdditional from './CardAdditional'
import useVuelidate from '@vuelidate/core'
import {required, requiredIf} from '@vuelidate/validators'
import Button from '@/components/Yaro/Button'

export default {
  name: 'AddCardTemplateModal',
  components: {CardGeneral, CardAdditional, Button},
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
    },
    additionalError() {
      if (!this.v$.$errors.length) return false
      const errors = this.v$.$errors.map(error => error.$property)
      const elementList = ['odometerTrack', 'timeTrackLength']
      const error = elementList.some(el => errors.find(err => err === el))
      return error
    },
      formattedCard() {
          return {
              ...this.card,
              additional: null,
              advisorApprove: false,
              approvalStatus: "No Status",
              archive: null,
              customPrice: null,
              displayFees: false,
              displayLabour: false,
              id: Math.floor(Math.random() * 100000),
              odometerTrack: +this.card.odometerTrack,
              partsForCustomer: null,
              relation: {},
              select: false,
              service: Math.floor(Math.random() * 100),
              status: "No Status",
              time: new Date().toLocaleTimeString(),
              timeTrackLength: +this.card.timeTrackLength,

          }
      },
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
      reset: 'company/card/reset',
      addCard: 'company/cards/addCard',
    }),
    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return
      const {name, description, cardType, cardRelationType, relation, vehicleUID, odometerTrack, timeTrackLength, timeTrackType} = this.card
      const card = {name, description, cardType, cardRelationType}
      if (this.card.descriptionForCustomer) card.descriptionForCustomer = this.card.descriptionForCustomer
      if (this.card.cardRelationType === 'custom-vehicles') card.relation = relation
      if (this.card.cardRelationType === 'specific-vehicle') card.vehicleUID = vehicleUID
      if (this.card.hasService && this.card.odometerTrack) card.odometerTrack = odometerTrack
      if (this.card.hasService && this.card.timeTrackLength) card.timeTrackLength = timeTrackLength
      if (this.card.hasService && this.card.timeTrackLength) card.timeTrackType = timeTrackType
        if(this.card.includedToEachOrder) {
            this.addCard(this.formattedCard)
        }
      try {
        this.isLoading = true
        await this.create(card)
        this.v$.$reset()
        this.reset()
        this.$vfm.hide('AddCardModal')
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
        relation: {
          requiredIf: requiredIf(() => this.card.cardRelationType === 'custom-vehicles'),
          make: {requiredIf: requiredIf(() => this.card.cardRelationType === 'custom-vehicles')}
        },
        odometerTrack: {requiredIf: requiredIf(() => this.card.hasService && !this.card.timeTrackLength)},
        timeTrackLength: {requiredIf: requiredIf(() => this.card.hasService && !this.card.odometerTrack)}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
