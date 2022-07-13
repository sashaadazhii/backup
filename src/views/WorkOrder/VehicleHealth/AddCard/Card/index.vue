<template>
  <div class="card__wrapper">
    <div class="card__icon">
      <i class="i-add_circle" />
    </div>
    <Label :label="cardRelation" size="small" circle class="card__Label -grey" />
    <div class="card__name">{{ card.name }}</div>
    <Label :label="cardWarranty" size="small" class="card__Label -border" />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'

import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Card',
  components: {Label},
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {
  },
  computed: {
    ...mapState({
      // cards: s => s.company.cards.cards
    }),
    cardRelation() {
      if (this.card.cardRelationType === 'all') return 'All Vehicles'
      const relations = this.card.relations.map(r => `${r.make} ${r.model} ${r.yearFrom}`)
      return relations.join(' ')
    },
    cardWarranty() {
      const {odometerTrack, timeTrackLength} = this.card
      return `${odometerTrack.toLocaleString('fr-FR')} KM / ${timeTrackLength.toLocaleString('fr-FR')} Months`
    }
  },
  methods: {
    ...mapMutations({
      // selectAll: 'company/cards/selectAll',
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
