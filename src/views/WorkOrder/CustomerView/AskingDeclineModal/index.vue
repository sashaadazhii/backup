<template>
  <vue-final-modal>
    <div class="modal">
      <div v-if="!showSecondModal" class="modal__first">
        <div class="modal__icon"><i class="i-circle_close" /></div>
        <div class="modal__title">Do you want to?</div>
        <div class="modal__text">We’ll remind you at your next visit</div>
        <div class="modal__buttons">
          <button class="modal__btn green" @click="preApproved">
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
import {mapState, mapActions, mapMutations} from 'vuex'
import Button from '@/components/Yaro/Button'
import DeclineModal from './DeclineModal'
import DeclineTemporaryModal from './DeclineTemporaryModal'
export default {
  name: 'AskingDeclineModal',
  components: {Button},
  data() {
    return {
      showSecondModal: false,
      uid: null,
      card: {}
    }
  },
  async created() {
    this.uid = this.$route.params.uid
    await this.findOrder(this.uid)
    const cardID = this.$route.params.cardID
    this.card = this.order.cannedServices.find(c => c.id.toString() === cardID)
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder
    })
  },
  methods: {
    ...mapActions({
      findOrder: 'workOrder/find'
    }),
    ...mapMutations({updateCard: 'company/cards/updateCard'}),
    decline() {
      this.card.approvalStatus = 'Permanently Decline'
      this.updateCard(this.card)
      this.$vfm.hide('AskingDeclineModal')
      this.$router.push(`/customer-view/${this.uid}`)
    },
    declineTemporary() {
      this.card.approvalStatus = 'Temporarily Decline'
      this.updateCard(this.card)
      this.$vfm.hide('AskingDeclineModal')
      this.$router.push(`/customer-view/${this.uid}`)
    },
    preApproved() {
      this.card.approvalStatus = 'Pre-approved'
      this.updateCard(this.card)
      this.$vfm.hide('AskingDeclineModal')
      this.$router.push(`/customer-view/${this.uid}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
