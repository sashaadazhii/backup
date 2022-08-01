<template>
  <div class="total__wrapper">
    <div class="total__title">JOB Totals</div>
    <div class="total__block block">
      <div class="block__row">
        <div class="block__icon" />
        <div class="block__name">Cooling System Service</div>
        <div class="block__desc">$320</div>
      </div>
    </div>
    <div class="total__block block">
      <div class="block__row -request">
        <div class="block__icon -purple" />
        <div class="block__name">Air filter change</div>
        <div class="block__desc"><i class="i-time" /> 2h</div>
        <div class="block__desc">$130</div>
      </div>
      <div class="block__row">
        <div class="block__icon" />
        <div class="block__name">Air filter change</div>
        <div class="block__desc">$43</div>
      </div>
      <div class="block__row">
        <div class="block__icon" />
        <div class="block__name">Air filter change</div>
        <div class="block__desc">$43</div>
      </div>
    </div>
    <div class="total__block block">
      <div class="block__row">
        <div class="block__icon" />
        <div class="block__name">Engine Belt</div>
        <div class="block__desc">$20</div>
      </div>
    </div>
    <div class="total__block block">
      <div class="block__row -border">
        <div class="block__icon -grey" />
        <div class="block__name">Total Parts</div>
        <div class="block__desc">$249</div>
      </div>
      <div class="block__row -border">
        <div class="block__icon -grey" />
        <div class="block__name">Total Labour</div>
        <div class="block__desc">$220</div>
      </div>
      <div class="block__row -border">
        <div class="block__icon -grey" />
        <div class="block__name">Sub Total</div>
        <div class="block__desc">$550</div>
      </div>
      <div class="block__row -border">
        <div class="block__icon -grey" />
        <div class="block__name">HST</div>
        <div class="block__desc">$71.5</div>
      </div>
      <div class="block__row -border">
        <div class="block__icon -dark" />
        <div class="block__name">Grand Total</div>
        <div class="block__desc">$656</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinanceTotal'
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
