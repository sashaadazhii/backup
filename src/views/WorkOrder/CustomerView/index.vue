<template>
  <div class="inspections">
    <header class="header">
      <div @click="$router.push(`/service-advisor/${this.uid}`)" class="header__link">
        <i class="i-keyboard_arrow_left" />
      </div>
      <div class="header__title">Work Order #<span>24</span></div>
      <div class="header__icon"><i class="i-question_answer" /></div>
    </header>
    <div class="inspections__wrapper">
      <div class="inspections__inner">
        <div class="message__wrapper">
          <div class="message">
            <div class="message__icon"><i class="i-customers" /></div>
            <div class="message__title">Hello, Brett!</div>
            <div class="message__subtitle">Inspection Done! 🚀</div>
            <div class="message__text">We’ve finished the inspection of your car. Here are the service technicians recommended action:</div>
          </div>
        </div>

        <div class="cards">
          <Card v-for="card in order.cannedServices" :key="card.id" :card="card" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'CustomerView',
  components: {Card},
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
