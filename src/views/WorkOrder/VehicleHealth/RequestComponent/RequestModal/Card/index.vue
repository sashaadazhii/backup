<template>
  <div class="card__wrapper" :class="{'-select': card.select}">
    <i v-if="card.select" class="i-device_hub blue" />
    <i v-if="card.select" class="i-check_circle green" @click="$emit('select', card.id)" />
    <i v-else class="i-add_circle grey" @click="$emit('select', card.id)" />
    <Label label="All Vehicles" size="small" circle />
    <span>Brake Fluid</span>
    <Label label="48,000 KM / 24 Months" border size="small" class="-light" />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'

import {mapState, mapMutations, mapActions} from 'vuex'
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
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
