<template>
  <div class="block__wrapper">
    <y-input
      title="Odometer Track"
      v-maska="'########'"
      :modelValue="odometerTrack"
      placeholder="Odometer Track"
      iconLeft="i-shutter_speed"
      iconColor="bluegreen"
      rightText="kilometers"
      @update:modelValue="setOdometerTrack"
    />

    <y-input
      title="Time Track"
      :modelValue="timeTrackLength"
      v-maska="'####'"
      placeholder="Time Track"
      iconLeft="i-time"
      iconColor="orange"
      rightText="months"
      error
      @update:modelValue="setTimeTrackLength"
    />
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'AddCardRelation',
  computed: {
    ...mapState({
      odometerTrack: s => s.company.card.card.odometerTrack,
      timeTrackLength: s => s.company.card.card.timeTrackLength,
      errors: s => s.company.card.errors
    })
  },
  methods: {
    ...mapMutations({
      setTimeTrackLength: 'company/card/setTimeTrackLength',
      setOdometerTrack: 'company/card/setOdometerTrack'
    })
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
