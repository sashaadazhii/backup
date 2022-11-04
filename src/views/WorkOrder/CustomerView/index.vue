<template>
  <div class="inspections">
    <header class="header">
      <div @click="$router.back()" class="header__link">
        <i class="i-keyboard_arrow_left" />
      </div>
      <div class="header__title">Work Order #<span>24</span></div>
      <div class="header__icon"></div>
    </header>
    <div class="inspections__wrapper">
      <div class="message__wrapper">
        <div class="message">
          <div class="message__icon"><i class="i-customers" /></div>
          <div class="message__title">Hello, Brett!</div>
          <div class="message__subtitle">Inspection Done! 🚀</div>
          <div class="message__text">We’ve finished the inspection of your car. Here are the service technicians recommended action:</div>
        </div>
      </div>

      <div class="cards">
        <!-- <div class="card">
          <div class="card__header">
            <Label label="card.status" size="small" color="#FFA14E" />
            <router-link :to="{name: 'CustomerCardPage', params: {id: id, cardID: cardID}}">
              <div class="card__arrow">
                <Button icon="i-keyboard_arrow_right" border grey class="button--arrow" />
              </div>
            </router-link>
          </div>
          <div class="card__main">
            <div class="card__title">card.title</div>
            <div class="card__text">card.description card.description card.description card.description card.description</div>
            <div class="card__row">
              <div class="card__text card__text--thin">Total Price</div>
              <div class="card__subtitle">$350.00</div>
            </div>
          </div>
          <div class="card__footer">
            <div class="card__footer-button">
              <div class="card__btn"><i class="i-check_circle_outline" /><span>Approved by Customer</span></div>
            </div>
          </div>
        </div> -->
        <Card v-for="card in order.cannedServices" :key="card.id" :card="card" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'CustomerView',
  components: {Card}, //{Card},
  data() {
    return {
      cardID: 3456,
      uid: null
    }
  },
  async created() {
    this.uid = this.$route.params.uid
    await this.findOrder(this.uid)
  },
  computed: {
    ...mapState({
      order: s => s.workOrder.workOrder
    })
  },
  methods: {
    ...mapActions({
      findOrder: 'workOrder/find'
    })
  }
}
</script>
<style scoped lang="scss">
@import 'style';
</style>
