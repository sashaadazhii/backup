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
    <div class="request__line"></div>
    <div class="request__cards">
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
import Card from '../Card'
export default {
  name: 'FinanceRequest',
  components: {Card}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
