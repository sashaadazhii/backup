<template>
  <div class="info__wrapper">
    <div class="info__side">
      <div class="info__block">
        <div class="info__block-title">Service Tracking</div>
        <div class="info__block-main">
          <div class="info__block-lbs">
            <Label icon="i-shutter_speed" iconColor="#3EB3BB" :label="`${card.timeTrackLength} Months`" border class="-shadow" />
            <Label icon="i-timer" iconColor="#3EB3BB" :label="`${card.odometerTrack.toLocaleString('fr-FR')} KM`" border class="-shadow" />
          </div>
        </div>
      </div>
      <div class="info__block">
        <div class="info__block-title">Card Details</div>
        <div class="info__block-main">
          <div class="info__block-row">
            <span>Last Updated:</span>
            <i class="i-calendar" />
            <span>22 Feb 2022 at 12:20</span>
          </div>
          <div class="info__block-row">
            <span>Last Updated by:</span>
            <Label alias="AS" size="mini" circle class="-mini" />
            <span>Dave Martin</span>
          </div>
          <div class="info__block-line" />
          <div class="info__block-row">
            <span>Card Created:</span>
            <i class="i-calendar" />
            <span>22 Feb 2022 at 12:20</span>
          </div>
          <div class="info__block-row">
            <span>Created by:</span>
            <Label alias="AS" size="mini" circle class="-mini" />
            <span>Dave Martin</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info__side">
      <div class="info__block">
        <div class="info__block-title">Card Description <span>(for in-house use)</span></div>
        <div class="info__block-text">{{ card.descriptionForCustomer }}</div>
      </div>
      <div class="info__block">
        <div class="info__block-title">Card Description</div>
        <div class="info__block-text">{{ card.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Label from '@/components/Yaro/Label'

export default {
  name: 'CardModalInfo',
  components: {Label},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      card: s => s.company.cardTemplates.template
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
