<template>
  <div class="card__wrapper" :class="{'-select': selected}" @click.self="openCard">
    <div class="card__top">
      <div class="card__top-left">
        <i v-if="selected" class="i-device_hub blue" />
        <i v-if="selected" class="i-check_circle green" @click="$emit('unselect', card)" />
        <i v-else class="i-add_circle grey" @click="$emit('select', card)" :style="!isStart ? 'pointer-events:none' : 'pointer-events:auto'" />
        <Label label="Ford F150 2021" size="small" circle />
        <div class="card__name">
          <span class="card__title">{{ card.name }}</span>
        </div>
      </div>
      <div class="card__top-right">
        <div class="card__top-labels">
          <Label icon="i-shutter_speed" iconColor="#3EB3BB" :label="`${card.timeTrackLength} Months`" border class="-shadow" />
          <Label icon="i-timer" iconColor="#3EB3BB" :label="`${card.odometerTrack.toLocaleString('fr-FR')} KM`" border class="-shadow" />
        </div>
      </div>
    </div>
    <div class="card__bottom">
      <div class="card__list">
        <Service v-for="service of card.services" :key="service.id" :service="service" />
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import CardPage from '../../../CardPage'

import {mapState, mapMutations} from 'vuex'
import Service from './Service'
export default {
  name: 'Card',
  components: {Label, Service},
  props: {
    card: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState({
      isStart: s => s.workOrder.isStart
    })
  },

  methods: {
    ...mapMutations({
      setCard: 'company/cards/setCard'
    }),
    openCard() {
      this.setCard(this.card)
      this.$vfm.show({
        component: CardPage,
        bind: {
          name: 'CardPage',
          'click-to-close': false,
          'esc-to-close': true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
