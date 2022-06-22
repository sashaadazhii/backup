<template>
  <div class="block__wrapper">
    <div class="block__inner">
      <div class="block__header">
        <div class="block__header-top"><i class="i-timelapse" /></div>
        <div class="block__header-bottom">
          Freeup, clean and lube sliders. Clean rust from brake rotors. This is done to extend the life of the brakes
          and extend your brake warranty to 3 years/60000km)
        </div>
      </div>
      <div class="block__main">
        <div class="block__row">
          <div class="block__row-name">Length:</div>
          <y-input
            v-maska="'########'"
            v-model.trim="odometerTrack"
            placeholder="Length"
            iconLeft="i-shutter_speed"
            iconColor="bluegreen"
            rightText="kilometers"
          />
        </div>
        <div class="block__row">
          <div class="block__row-name">Time:</div>
          <y-input
            v-maska="'####'"
            v-model.trim="timeTrackLength"
            placeholder="Time"
            iconLeft="i-time"
            iconColor="orange"
            rightText="months"
          />
        </div>
      </div>
    </div>
    <div class="block__footer">
      <button class="block__btn green" @click="save"><span>Save</span><Loader :show="isLoading" /></button>
      <button class="block__btn" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Loader from '@/components/loader'

export default {
  name: 'CardTemplateTracking',
  components: {Loader},
  data() {
    return {
      isLoading: false,
      odometerTrack: null,
      timeTrackLength: null
    }
  },
  created() {
    const {odometerTrack, timeTrackLength} = this.template
    this.odometerTrack = odometerTrack
    this.timeTrackLength = timeTrackLength
  },
  computed: {
    ...mapState({
      template: s => s.company.cardTemplates.template
    })
  },

  methods: {
    ...mapActions({
      update: 'company/cardTemplates/update'
    }),
    ...mapMutations({
      updateTemplate: 'company/cardTemplates/update'
    }),
    async save() {
      if (this.isLoading) return
      const {name, description, templateID, descriptionForCustomer} = this.template
      const {odometerTrack, timeTrackLength} = this
      const template = {
        name,
        description
      }
      if (descriptionForCustomer) template.descriptionForCustomer = descriptionForCustomer
      if (odometerTrack) {
        template.useServiceTrack = true
        template.odometerTrack = odometerTrack
      }
      if (timeTrackLength) {
        template.useServiceTrack = true
        template.timeTrackLength = timeTrackLength
        template.timeTrackType = 'months'
      }
      if (!odometerTrack && !timeTrackLength) {
        template.useServiceTrack = false
      }
      try {
        this.isLoading = true
        const req = await this.update({id: templateID, template})
        this.updateTemplate(req.data)
      } finally {
        this.isLoading = false
      }
    },
    cancel() {
      const {odometerTrack, timeTrackLength} = this.template
      this.odometerTrack = odometerTrack
      this.timeTrackLength = timeTrackLength
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
