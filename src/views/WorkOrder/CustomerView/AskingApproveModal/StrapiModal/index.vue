<template>
  <vue-final-modal @before-open="beforeOpen">
    <div class="modal">
      <div class="modal__first">
        <div class="modal__title">Payment Details</div>
        <div class="modal__row full">
          <div class="modal__input-wrap">
            <div class="modal__text">Cars number</div>
            <input v-model="cardNumber" type="tel" class="modal__input" placeholder="1234 1234 1234 1234" v-maska="'#### #### #### ####'" />
            <!-- TODO: replace with font normal icons -->
            <div class="modal__icons">
              <div class="modal__icon">
                <img src="@/assets/images/card.svg" alt="credit card" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal__row">
          <div class="modal__input-wrap">
            <div class="modal__text">Expiration</div>
            <input v-model="cardDate" type="tel" class="modal__input" placeholder="MM / YY" v-maska="'## / ##'" @input="getMonth($event)" />
          </div>
          <div class="modal__input-wrap">
            <div class="modal__text">CVC</div>
            <input v-model="cardCVC" type="tel" class="modal__input" placeholder="CVC" v-maska="'###'" />
            <!-- TODO: replace with font normal icons -->
            <div class="modal__icons">
              <div class="modal__icon">
                <img src="@/assets/images/cvv_back.svg" alt="credit card" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal__buttons">
          <Button
            :label="`Pay ${formatter(price)}`"
            @click="approve"
            :disabled="cardNumber?.length !== 19 || cardDate?.length !== 7 || cardCVC?.length !== 3"
          />
          <Button label="Cancel" border @click="$vfm.hide('StrapiModal')" />
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Button from '@/components/Yaro/Button'
import ApproveModal from '../ApproveModal'
export default {
  name: 'StrapiModal',
  components: {Button},
  data() {
    return {
      id: null,
      cardDate: null,
      cardCVC: null,
      cardNumber: null,
      price: null
    }
  },
  async created() {
    const id = this.card.id
    this.price = await this.getCardPrice(id)
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
      update: 'cards/updateCard',
      getCardPrice: 'cards/getCardPrice'
    }),
    async approve() {
      await this.update({id: this.card.id, workOrderID: this.card.workOrderID, params: {status: 'Done', approvalStatus: 'Approved by You'}})
      this.$vfm.hide('StrapiModal')
      this.$vfm.show({
        component: ApproveModal,
        bind: {
          name: 'ApproveModal'
        }
      })
    },
    async beforeOpen(e) {
      this.id = e.ref.params._value
      await this.findCard(this.id)
      await this.fetch(this.card.workOrderID)
    },
    getMonth(e) {
      if (+this.cardDate[0] > 1 && +this.cardDate[0] !== 0) this.cardDate = '0' + e.target.value
      if (+this.cardDate[1] > 2 && +this.cardDate[0] !== 0) {
        this.cardDate = '0' + e.target.value
      }
    },
    formatter(val) {
      const price = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'}).format(val)
      return price
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
