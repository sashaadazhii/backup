<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div v-if="templateID" class="modal__title">Edit Canned Service</div>
        <div v-else class="modal__title">Add New Canned Service</div>
      </div>
      <div class="modal__main">
        <Input v-model.trim="name" placeholder="Enter Canned Service title" :error="v$.name.$error" />

        <div class="modal__row">
          <i class="i-time" /><span>Time required: </span>
          <Input
            v-model.trim="estimatedTime"
            placeholder="Enter time"
            :error="v$.estimatedTime.$error"
            v-maska="{mask: 'HHHHHHH', tokens: {H: {pattern: /[0-9.]/}}}"
            class="input-small"
          />
        </div>

        <!-- <div class="y-number__wrapper">
          <div class="y-number__title">Estimated Time</div>
          <div class="y-number__inner">
            <i class="i-remove y-number__dec" :class="{'-disabled': !time}" @click="decTime()" />
            <span class="y-number__text">{{ estimatedTime }} h</span>
            <i class="i-add y-number__inc" @click="incTime()" />
          </div>
        </div> -->
        <!-- <label class="field__label">
          <div class="field__title">Description</div>
          <textarea class="field__text" placeholder="Description" v-model="description"></textarea>
        </label> -->
        <div class="textarea">
          <div class="textarea__title">Description</div>
          <textarea class="textarea__text" placeholder="Enter Service Description" v-model="description"></textarea>
        </div>
        <!-- 
        <div class="field__select">
          <div class="field__title">Warranty</div>
          <Dropdown v-model="warranty" :options="warrantyList" @change="selectWarranty">
            <template #value="{value}">
              <div class="field__select-option">
                <i v-if="value.id === 'off'" class="i-remove_moderator red" />
                <i v-if="value.id === 'global'" class="i-shield green" />
                <i v-if="value.id === 'custom'" class="i-add_moderator blue" />
                <span>{{ value.label }}</span>
              </div>
            </template>
            <template #option="{option}">
              <div class="field__select-label">
                <i v-if="option.id === 'off'" class="i-remove_moderator red" />
                <i v-if="option.id === 'global'" class="i-shield green" />
                <i v-if="option.id === 'custom'" class="i-add_moderator blue" />
                <span>{{ option.label }}</span>
              </div>
            </template>
          </Dropdown>
        </div> -->
        <!-- <y-input
          v-if="warranty && warranty.id === 'custom'"
          v-maska="'########'"
          v-model.trim="range"
          ref="warrantyOdometr"
          title="Warranty Period"
          placeholder="Warranty Period"
          iconLeft="i-shutter_speed"
          iconColor="bluegreen"
          rightText="kilometers"
          :error="v$.range.$error"
        />
        <y-input
          v-if="warranty && warranty.id === 'custom'"
          v-maska="'####'"
          v-model.trim="time"
          title="Warranty Period"
          placeholder="Warranty Period"
          iconLeft="i-time"
          iconColor="orange"
          rightText="months"
          :error="v$.time.$error"
        /> -->
        <div class="textarea red">
          <div class="textarea__title">Permanently Declined Message</div>
          <textarea class="textarea__text" placeholder="Enter permanently declined message" v-model="permanentlyDeclineMessage"></textarea>
        </div>
        <div class="textarea blue">
          <div class="textarea__title">Temporarily Declined Message</div>
          <textarea class="textarea__text" placeholder="Enter temporarily declined message" v-model="temporarilyDeclineMessage"></textarea>
        </div>
      </div>
      <!-- PARTS -->
      <!-- <div class="service__parts">
        <Part v-for="(part, idx) of parts" :key="idx" :part="part" class="service__part" />
        <div v-if="partsKits.length" class="service__kit-wrap">
          <PartsKit v-for="kit of partsKits" :key="kit.id" :kit="kit" />
        </div>

        <NewPart v-if="isNewPart" :serviceID="service.id" @close="open" />
      </div> -->
      <div class="modal__footer">
        <Button label="Save Canned Service" size="large" @click="save" />
        <Button label="Cancel" size="large" grey @click="close" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Button from '@/components/Yaro/Button'
import Dropdown from '@/components/Yaro/Dropdown'
import Input from '@/components/Yaro/Input'
import useVuelidate from '@vuelidate/core'
import {required, requiredIf} from '@vuelidate/validators'
// import Part from '../Service/Part'
// import PartsKit from '../Service/PartsKit'
// import NewPart from '../Service/NewPart'

export default {
  name: 'AddNewCannedServiceModal',
  components: {Button, Input}, //Part, NewPart, PartsKit,Dropdown
  data() {
    return {
      v$: useVuelidate(),
      name: null,
      description: null,
      estimatedTime: null, //0.5,
      warranty: {id: 'off', label: 'Warranty Off'},
      warrantyList: [
        {id: 'off', label: 'Warranty Off'},
        {id: 'custom', label: 'Custom Warranty'},
        {id: 'global', label: `Global Warranty — 40 000 KM/ 6 months`}
      ],
      time: null,
      range: null,
      templateID: null,
      id: null,
      isLoading: false,
      averageTime: null,
      used: 1,
      parts: [],
      guides: [],
      permanentlyDeclineMessage: null,
      temporarilyDeclineMessage: null,
      service: {}
    }
  },
  async created() {
    // if (!this.company.id) await this.fetchCompanySettings()
    // if (this.company.hasGlobalWarranty) {
    //   const {warrantyRange, warrantyTime} = this.company
    //   const globalWarranty = {
    //     id: 'global',
    //     label: `Global Warranty — ${warrantyRange.toLocaleString('fr-FR')} KM/ ${warrantyTime} years`
    //   }
    //   this.warrantyList.unshift(globalWarranty)
    //   this.warranty = globalWarranty
    // }
  },
  computed: {
    ...mapState({
      card: s => s.company.cardTemplates.template,
      cardId: s => s.company.cards.card.templateID
      // company: s => s.company.settings.settings
    })
  },
  methods: {
    ...mapMutations({
      add: 'company/cannedServices/add',
      update: 'company/cannedServices/update'
    }),

    async selectWarranty(warranty) {
      if (warranty.value.id === 'custom') {
        await this.$nextTick()
        this.$refs.warrantyOdometr.$el.focus()
      }
    },
    // decTime() {
    //   if (this.estimatedTime > 0.5) this.estimatedTime -= 0.5
    // },
    // incTime() {
    //   this.estimatedTime += 0.5
    // },

    async save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return
      const id = this.cardId || this.card.templateID
      const {name, estimatedTime, warranty, time, range, description, averageTime, used, parts, guides} = this
      const service = {
        name,
        estimatedTime,
        warrantyType: warranty.id,
        warranty: {},
        description,
        averageTime,
        used,
        parts,
        guides,
        select: false
      }

      if (warranty.id === 'custom') {
        if (time) service.warranty.time = time
        if (range) service.warranty.range = range
      } else if (warranty.id === 'global') {
        service.warranty = {
          time: 6,
          range: 40_000
        }
      }
      try {
        this.isLoading = true
        if (this.templateID) {
          service.templateID = this.templateID
          service.id = this.id
          this.update(service)
          this.$vfm.hide('CreateService')
        } else {
          service.templateID = id
          service.id = this.$getID()
          this.add(service)
          this.$vfm.hide('CreateService')
        }
      } finally {
        this.isLoading = false
      }
    },
    beforeOpen(e) {
      const service = e.ref.params._rawValue

      if (service) {
        const {name, estimatedTime, warrantyType, description, warranty, templateID, id, averageTime, used, parts, guides} = service
        this.templateID = templateID
        this.id = id
        this.name = name
        this.estimatedTime = estimatedTime
        this.description = description
        this.warranty = this.warrantyList.find(w => w.id === warrantyType)
        this.time = warranty.time
        this.range = warranty.range
        this.averageTime = averageTime
        this.used = used
        this.parts = parts
        this.guides = guides
      }
    }
  },
  validations() {
    return {
      name: {required},
      description: {},
      estimatedTime: {required},
      time: {requiredIf: requiredIf(() => this.warranty.id === 'custom' && !this.range)},
      range: {requiredIf: requiredIf(() => this.warranty.id === 'custom' && !this.time)}
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
