<template>
  <div class="service__row">
    <div class="service__icon"></div>
    <div class="service__title">{{ service.name }}</div>
  </div>
</template>
<script>
export default {
  name: 'ServiceSlot',
  props: {
    service: {type: Object}
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/styles/_variables.scss';

.service {
  &__row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-left: 32px;
    padding-bottom: 6px;
  }

  &__icon {
    width: 12px;
    height: 12px;
    background: url('../../../../../../assets/icons/focus-green.svg') 50% no-repeat;
    background-size: contain;
  }
  &__title {
    @include font(14px, $color-grey, 500);
  }
}
</style>
