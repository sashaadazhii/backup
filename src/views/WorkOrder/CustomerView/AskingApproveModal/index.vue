<template>
  <vue-final-modal @before-open="beforeOpen">
    <!-- @before-open="beforeOpen" -->
    <div class="modal">
      <div class="modal__first">
        <div class="modal__icon"><i class="i-circle_close" /></div>
        <div class="modal__title">Do you want to approve order?</div>
        <div class="modal__buttons">
          <Button label="Proceed Payment" @click="approve" />
          <Button label="Cancel" border @click="$vfm.hide('AskingApproveModal')" />
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Button from '@/components/Yaro/Button'
// import StrapiModal from './StrapiModal'
export default {
  name: 'AskingApproveModal',
  components: {Button},
  data() {
    return {
      id: null
    }
  },
  computed: {
    ...mapState({
      card: s => s.cards.card,
      cards: s => s.cards.cards
    })
  },
  methods: {
    ...mapActions({
      fetch: 'cards/fetch',
      findCard: 'cards/find',
      update: 'cards/updateCard'
    }),
    async approve() {
      // await this.update({id: this.card.id, workOrderID: this.card.workOrderID, params: {status: 'Done', approvedWith: 'Approved by You'}})
      this.$vfm.hide('AskingApproveModal')
      this.$vfm.show(
        {
          component: StrapiModal,
          bind: {
            name: 'StrapiModal'
          }
        },
        this.card.id
      )
    },
    async beforeOpen(e) {
      // this.id = e.ref.params._value
      this.id = this.$route.params.id
      await this.findCard(this.id)
      await this.fetch(this.card.workOrderID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
