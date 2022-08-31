<template>
  <div class="block__wrapper">
    <div class="block__header">
      <span>Card has service tracking</span>
      <Switch :modelValue="hasService" @click="setService(!hasService)" />
    </div>
    <Input
      :disabled="!hasService"
      title="Odometer Track"
      v-maska="'########'"
      :modelValue="odometerTrack"
      placeholder="Odometer Track"
      iconLeft="i-shutter_speed"
      iconColor="bluegreen"
      rightText="kilometers"
      :error="error('odometerTrack')"
      theme="white"
      @update:modelValue="setOdometerTrack"
    />
    <Input
      :disabled="!hasService"
      title="Time Track"
      :modelValue="timeTrackLength"
      v-maska="'####'"
      placeholder="Time Track"
      iconLeft="i-time"
      iconColor="orange"
      rightText="months"
      :error="error('timeTrackLength')"
      theme="white"
      @update:modelValue="setTimeTrackLength"
    />
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Input from '@/components/Yaro/Input'
import Switch from '@/components/Yaro/Switch'

export default {
  name: 'AddCardRelation',
  components: {Input, Switch},
  computed: {
    ...mapState({
      odometerTrack: s => s.company.card.card.odometerTrack,
      timeTrackLength: s => s.company.card.card.timeTrackLength,
      hasService: s => s.company.card.card.hasService,
      errors: s => s.company.card.errors
    })
  },
  methods: {
    ...mapMutations({
      setTimeTrackLength: 'company/card/setTimeTrackLength',
      setOdometerTrack: 'company/card/setOdometerTrack',
      setService: 'company/card/setService'
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
