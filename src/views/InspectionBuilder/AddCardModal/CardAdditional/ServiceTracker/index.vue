<template>
  <div class="block__wrapper">
    <Input
      title="Odometer Track"
      v-maska="'########'"
      :modelValue="odometerTrack"
      placeholder="Odometer Track"
      iconLeft="i-shutter_speed"
      iconColor="bluegreen"
      rightText="kilometers"
      :error="error('odometerTrack')"
      @update:modelValue="setOdometerTrack"
    />

    <Input
      title="Time Track"
      :modelValue="timeTrackLength"
      v-maska="'####'"
      placeholder="Time Track"
      iconLeft="i-time"
      iconColor="orange"
      rightText="months"
      :error="error('timeTrackLength')"
      @update:modelValue="setTimeTrackLength"
    />
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Input from '@/components/Yaro/Input'

export default {
  name: 'AddCardRelation',
  components: {Input},
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
    }),
    error(name) {
      const error = this.errors.find(err => err.$property === name)
      if (error) return true
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
