<template>
  <vue-final-modal v-slot="{close}" @before-open="beforeOpen">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__header-title">Cards Library</div>
        <Button label="Create New Card" icon="i-add_circle" size="small" />
        <Button icon="i-circle_close" border grey circle iconSize="20px" size="small" @click="close" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import Button from '@/components/Yaro/Button'

import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'AddCard',
  components: {Button},
  data() {
    return {}
  },
  async created() {
    await this.fetchCards()
  },
  computed: {
    ...mapState({
      // cards: s => s.company.cards.cards
      cards: s => s.company.cardTemplates.templates
    })
  },
  methods: {
    ...mapActions({
      fetchCards: 'company/cardTemplates/fetch'
    }),
    ...mapMutations({
      // selectAll: 'company/cards/selectAll',
    }),
    beforeOpen(e) {
      // console.log(e)
      // this.part = e.ref.params._rawValue
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
