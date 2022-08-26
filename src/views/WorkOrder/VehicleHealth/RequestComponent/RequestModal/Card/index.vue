<template>
  <div class="card__wrapper" :class="{'-select': selected}" @click.self="openCard">
    <i v-if="selected" class="i-device_hub blue" />
    <i v-if="selected" class="i-check_circle green" @click="$emit('select', card)" />
    <i v-else class="i-add_circle grey" @click="$emit('select', card)" />
    <Label label="All Vehicles" size="small" circle />
    <span>{{ card.name }}</span>
    <Label :label="`${card.odometerTrack.toLocaleString('fr-FR')} KM / ${card.service} Months`" border size="small" class="-light" />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import CardPage from '../../../CardPage'

import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'Card',
  components: {Label},
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
  data() {
    return {}
  },
  async created() {},
  computed: {
    ...mapState({
      // cards: s => s.company.cardTemplates.templates
    })
  },
  methods: {
    ...mapActions({
      // fetchCards: 'company/cardTemplates/fetch'
    }),
    ...mapMutations({
      // selectAll: 'company/cards/selectAll',
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
