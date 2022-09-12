<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div v-if="templateID" class="modal__title">Edit Canned Service</div>
        <div v-else class="modal__title">Add New Canned Service</div>
        <button class="modal__close" @click="close"><i class="i-circle_close" /></button>
      </div>
      <div class="modal__main">
        <y-input v-model.trim="name" title="Name" placeholder="Name" :error="v$.name.$error" />
        <label class="field__label">
          <div class="field__title">Description</div>
          <textarea class="field__text" placeholder="Description" v-model="description"></textarea>
        </label>
        <div class="y-number__wrapper">
          <div class="y-number__title">Estimated Time</div>
          <div class="y-number__inner">
            <i class="i-remove y-number__dec" :class="{'-disabled': !time}" @click="decTime()" />
            <span class="y-number__text">{{ estimatedTime }} h</span>
            <i class="i-add y-number__inc" @click="incTime()" />
          </div>
        </div>
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
        </div>
        <y-input
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
        />
        <Textarea title="Temporarily Declined Message" placeholder="Enter message" />
        <Textarea title="Permanently Declined Message" placeholder="Enter message" />
      </div>
      <div class="modal__footer">
        <button class="modal__button" @click="Save"><span>Save</span><Loader :show="isLoading" /></button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Loader from '@/components/loader'
import Dropdown from '@/components/Yaro/Dropdown'
import Textarea from '@/components/Yaro/Textarea'
import useVuelidate from '@vuelidate/core'
import {required, requiredIf} from '@vuelidate/validators'

export default {
  name: 'AddNewCannedServiceModal',
  components: {Loader, Dropdown, Textarea},
  data() {
    return {
      v$: useVuelidate(),
      name: null,
      description: null,
      estimatedTime: 0.5,
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
      guides: []
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
      card: s => s.company.cardTemplates.template
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
    decTime() {
      if (this.estimatedTime > 0.5) this.estimatedTime -= 0.5
    },
    incTime() {
      this.estimatedTime += 0.5
    },

    async Save() {
      if (this.isLoading) return
      const result = await this.v$.$validate()
      if (!result) return
      const id = this.card.templateID
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
        guides
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
