<template>
  <div class="card__wrapper" @click="$router.push(`/work-order/${workOrderUid}/finance/${cardID}`)" >
    <div class="card__labels">
      <Label label="Recommended" class="-orange" />
      <Label label="No Customer Status" class="-border -grey" border circle />
    </div>
    <div class="card__header">
      <Label label="$43" />
      <div class="card__title">Air filter change</div>
    </div>
    <div class="card__body">
      Complete engine Tune-up and induction system service. Recommended to improve fuel mileage, emissions, prevent misfires and improve overall engine
      performance
    </div>
  </div>
</template>

<script>
import Label from '@/components/Yaro/Label'
export default {
  name: 'FinanceCard',
  components: {Label},
  data() {
    return {
      workOrderUid: 'new',
      cardID: '314'
    }
  },
  created() {
    this.workOrderUid = this.$route.params.uid
    this.cardID = '314'
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
