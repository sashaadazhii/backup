<template>
  <div class="request__wrapper">
    <div class="request__inner">
      <div class="request__title">Customer Request</div>
      <div class="request__header">
        <div class="request__time">
          <i class="i-time purple" />
          Alloted Time:
          <span> 2h 30 mins</span>
        </div>
        <div class="request__time">
          <i class="i-time green" />
          Technician Tracked Time:
          <span> 2h 30 mins</span>
        </div>
      </div>
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
        <Card v-for="(card, idx) of 2" :key="idx" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../Card'
export default {
  name: 'FinanceRequest',
  components: {Card},
  data() {
    return {
      lineHeight: ''
    }
  },
  mounted() {
    const cards = this.$refs.cards
    setTimeout(() => {
      this.createLine()
    }, 400)
    console.log(cards)
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
.line__horizontal {
  height: 1px;
  width: 20px;
  position: absolute;
  background-color: #6b7280;
  &:last-child {
    height: 20px;
    width: 20px;
    border-left: 1px solid #6b7280;
    border-bottom: 1px solid #6b7280;
    border-radius: 0 0 0 10px;
    background-color: transparent;
    transform: translateY(-50%);
  }
}
.line__vertical {
  height: 100%;
  width: 1px;
  background-color: #6b7280;
  position: absolute;
  top: 20px;
}
</style>

<style lang="scss" scoped>
@import 'style';
</style>
