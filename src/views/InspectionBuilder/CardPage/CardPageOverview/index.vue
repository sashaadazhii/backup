<template>
  <div class="block__wrapper">
    <div class="block__info info">
      <div class="info__header">Card Details</div>
      <div class="info__cell">
        <div class="info__cell-title">Last updated:</div>
        <div class="info__cell-text">{{ dayjs(template.updatedAt).format('DD MMM YYYY [at] hh:mm A') }}</div>
      </div>
      <div v-if="template.updatedBy" class="info__cell">
        <div class="info__cell-title">Last updated by:</div>
        <div class="info__cell-text">{{ template.updatedBy?.firstName }} {{ template.updatedBy?.lastName }}</div>
      </div>
      <div class="info__cell">
        <div class="info__cell-title">Card Created:</div>
        <div class="info__cell-text">{{ dayjs(template.createdAt).format('DD MMM YYYY [at] hh:mm A') }}</div>
      </div>
      <div class="info__cell">
        <div class="info__cell-title">Created by:</div>
        <div class="info__cell-text">{{ template.author?.firstName }} {{ template.author?.lastName }}</div>
      </div>
    </div>
    <div class="block__description">
      <div class="description">
        <div class="description__header">
          <div class="description__title">Card Description</div>
          <div class="description__subtitle">(for in-house use)</div>
          <div v-if="!isEditDesc" class="description__button" @click="editDesc">Edit</div>
          <div v-if="isEditDesc" class="description__button green" @click="changeDesc">Save</div>
          <div v-if="isEditDesc" class="description__button grey" @click="cancelDesc">Cancel</div>
        </div>
        <div class="description__main" ref="description" :contenteditable="isEditDesc" tabindex="-1">
          {{ template.description }}
        </div>
      </div>
      <div class="description__line"></div>
      <div class="description">
        <div class="description__header">
          <div class="description__title">Customer Facing Description</div>
          <div v-if="!isEditCusDesc" class="description__button" @click="editCusDesc">Edit</div>
          <div v-if="isEditCusDesc" class="description__button green" @click="changeCusDesc">Save</div>
          <div v-if="isEditCusDesc" class="description__button grey" @click="cancelCusDesc">Cancel</div>
        </div>
        <div class="description__main" ref="customerDescription" :contenteditable="isEditCusDesc">
          {{ template.descriptionForCustomer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'CardTemplateOverview',
  data() {
    return {
      dayjs,
      isEditDesc: false,
      isLoading: false,
      isEditCusDesc: false
    }
  },
  computed: {
    ...mapState({
      template: s => s.company.cardTemplates.template
    })
  },
  methods: {
    ...mapMutations({
      setTemplate: 'company/cardTemplates/setTemplate'
    }),
    ...mapActions({
      updateTemplate: 'company/cardTemplates/update'
    }),
    editDesc() {
      this.isEditDesc = !this.isEditDesc
      setTimeout(() => {
        this.$refs.description.focus()
      }, 0)
    },
    async changeDesc() {
      if (this.isLoading) return
      const description = this.$refs.description.textContent
      const id = this.template.templateID
      try {
        const {name, useServiceTrack} = this.template

        const template = {name, useServiceTrack, description}
        if (useServiceTrack) {
          const {odometerTrack, timeTrackLength, timeTrackType} = this.template
          template.odometerTrack = odometerTrack
          template.timeTrackLength = timeTrackLength
          template.timeTrackType = timeTrackType
        }

        await this.updateTemplate({...this.template, description})
        this.isEditDesc = false
      } finally {
        this.isLoading = false
      }
    },
    cancelDesc() {
      if (this.isLoading) return
      this.$refs.description.textContent = this.template.description
      this.isEditDesc = false
    },

    editCusDesc() {
      this.isEditCusDesc = !this.isEditCusDesc
      setTimeout(() => {
        this.$refs.customerDescription.focus()
      }, 0)
    },
    async changeCusDesc() {
      if (this.isLoading) return
      const descriptionForCustomer = this.$refs.customerDescription.textContent
      const id = this.template.templateID
      try {
        const {name, useServiceTrack, description} = this.template

        const template = {name, useServiceTrack, description, descriptionForCustomer}
        if (useServiceTrack) {
          const {odometerTrack, timeTrackLength, timeTrackType} = this.template
          template.odometerTrack = odometerTrack
          template.timeTrackLength = timeTrackLength
          template.timeTrackType = timeTrackType
        }
        await this.updateTemplate({...this.template, descriptionForCustomer})
        this.isEditCusDesc = false
      } finally {
        this.isLoading = false
      }
    },
    cancelCusDesc() {
      if (this.isLoading) return
      this.$refs.customerDescription.textContent = this.template.descriptionForCustomer
      this.isEditCusDesc = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
