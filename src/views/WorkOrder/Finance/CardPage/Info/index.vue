<template>
  <div class="info__wrapper">
    <div class="info__header">
      <Button icon="i-arrow_back" border circle size="small" @click="$router.back()" />
      <div class="info__header-title">Cooling System Service</div>
      <Label label="Recommended" class="-orange" />
      <Label label="No Customer Status" class="-border -grey" border circle />
    </div>
    <div class="info__block block">
      <div class="block__inner">
        <div class="block__inner-title -bold">Cooling System Service</div>
      </div>
    </div>
    <div class="info__block block">
      <div class="block__inner">
        <div class="block__inner-title">Customer Facing Description</div>
        <div class="block__inner-body">
          Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine
          performance
        </div>
      </div>
    </div>
    <div class="info__block block -red">
      <div class="block__header">Permanent Denial Message:</div>
      <div class="block__inner">
        <div class="block__inner-body">In case you decline this card your car is just not going to be able to ride.</div>
      </div>
    </div>
    <div class="info__block block -blue">
      <div class="block__header">Temporal Denial Message:</div>
      <div class="block__inner">
        <div class="block__inner-body">In case you decline this card your car is just not going to be able to ride.</div>
      </div>
    </div>
    <Parts />
    <Job />
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
import Button from '@/components/Yaro/Button'
import Parts from './Parts'
import Job from './Job'
export default {
  name: 'FinanceCardPageInfo',
  components: {Label, Button, Parts, Job}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
