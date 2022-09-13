<template>
  <div class="request__wrapper">
    <div class="request__inner">
      <div class="request__title">Customer Request</div>
      <div class="request__body">
        Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine
        performance
      </div>
    </div>

    <div class="request__cards">
      <div class="request__line line" ref="block">
        <div class="line__vertical" ref="line" />
      </div>
      <div ref="cards" id="cards" class="request__cards-inner">
        <Card v-for="(card, idx) of cards" :key="idx" :card="card" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/max-len */
import Card from '../Card'
export default {
  name: 'FinanceRequest',
  components: {Card},
  data() {
    return {
      lineHeight: '',
      cards: [
        {
          id: 1,
          status: 'Recommended',
          approvalStatus: 'Approved For Next Visit',
          title: 'Cooling System Service',
          price: 320,
          description:
            'Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine performance',
          isDone: false
        },
        {
          id: 2,
          status: 'Recommended',
          approvalStatus: 'Approved By SA',
          title: 'Air filter change',
          price: 380,
          description:
            'Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine performance',
          isDone: false
        }
      ]
    }
  },
  mounted() {
    const cards = this.$refs.cards
    setTimeout(() => {
      this.createLine()
    }, 400)
  },
  methods: {
    createLine() {
      const cards = this.$refs.cards
      const lineBlock = this.$refs.block
      const cardsHeight = (this.lineHeight = cards.clientHeight)
      const cardsChildren = cards.children
      for (const cardElem of cardsChildren) {
        const cardLine = document.createElement('div')
        cardLine.className = 'line__horizontal'
        cardLine.style.top = cardElem.offsetTop + cardElem.offsetHeight / 2 + 'px'
        lineBlock.append(cardLine)
      }
      const lastCard = cardsChildren[cardsChildren.length - 1]
      const verticalLine = this.$refs.line
      verticalLine.style.height = lastCard.offsetTop + lastCard.offsetHeight / 2 - 20 + 'px'
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/styles/_variables.scss';

.line__horizontal {
  height: 1px;
  width: 20px;
  position: absolute;
  background-color: $color-grey-light;
  &:last-child {
    height: 20px;
    width: 20px;
    border-left: 1px solid $color-grey-light;
    border-bottom: 1px solid $color-grey-light;
    border-radius: 0 0 0 10px;
    background-color: transparent;
    transform: translateY(-50%);
  }
}
.line__vertical {
  height: 100%;
  width: 1px;
  background-color: $color-grey-light;
  position: absolute;
  top: 20px;
}
</style>

<style lang="scss" scoped>
@import 'style';
</style>
