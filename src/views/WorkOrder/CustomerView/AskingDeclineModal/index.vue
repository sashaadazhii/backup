<template>
  <vue-final-modal @before-open="beforeOpen">
    <div class="modal">
      <div v-if="!showSecondModal" class="modal__first">
        <div class="modal__icon"><i class="i-circle_close" /></div>
        <div class="modal__title">Do you want to?</div>
        <div class="modal__text">We’ll remind you at your next visit</div>
        <div class="modal__buttons">
          <button class="modal__btn green" @click="declineTemporary">
            <span class="modal__btn-icon"><i class="i-calendar" /></span>Let’s do it next visit
          </button>
          <button class="modal__btn blue" @click="declineTemporary">
            <span class="modal__btn-icon"><i class="i-timer" /></span>Reach out to me in the future
          </button>
          <button class="modal__btn" @click="showSecondModal = !showSecondModal">
            <span class="modal__btn-icon"> <i class="i-circle_close" /> </span>Permanently Decline
          </button>
        </div>
      </div>
      <div v-if="showSecondModal" class="modal__second">
        <div class="modal__icon"><i class="i-circle_close" /></div>
        <div class="modal__title">Safety warning</div>
        <div class="modal__text">Loose part, not safe for driving. Should be replaced as soon as possible.</div>
        <div class="modal__buttons">
          <Button label="Decline Anyway" color="#F37878" red @click="decline" />
          <Button label="Cancel" border @click="$vfm.hide('AskingDeclineModal')" />
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Button from '@/components/Yaro/Button'
import DeclineModal from './DeclineModal'
import DeclineTemporaryModal from './DeclineTemporaryModal'
export default {
  name: 'AskingDeclineModal',
  components: {Button},
  data() {
    return {
      showSecondModal: false,
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
    async decline() {
      await this.update({
        id: this.card.id,
        workOrderID: this.card.workOrderID,
        params: {status: 'Component Unsafe', approvedWith: 'Permanently Decline by You'}
      })
      this.$vfm.hide('AskingDeclineModal')
      this.$vfm.show({
        component: DeclineModal,
        bind: {
          name: 'DeclineModal'
        }
      })
    },
    async declineTemporary() {
      await this.update({
        id: this.card.id,
        workOrderID: this.card.workOrderID,
        params: {status: 'Component Unsafe', approvedWith: 'Declined by You until next visit'}
      })
      this.$vfm.hide('AskingDeclineModal')
      this.$vfm.show({
        component: DeclineTemporaryModal,
        bind: {
          name: 'DeclineTemporaryModal'
        }
      })
    },
    async beforeOpen(e) {
      this.id = e.ref.params._value
      await this.findCard(this.id)
      await this.fetch(this.card.workOrderID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
