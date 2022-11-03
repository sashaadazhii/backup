<template>
  <div class="list__item" :class="{hide: card.partsForCustomer === 'Display Total Price Only'}">
    <div v-if="card.partsForCustomer === 'Display Total Price & Parts'" class="list__inner wide">
      <div class="list__icon">
        <i v-if="part.isService || part.isLabour" class="i-monetization_on" :style="[part.isService ? 'color: #BA8AE7' : 'color: #2C9AFF']" />
        <i v-else class="i-build" />
      </div>
      <div class="list__info">
        <div class="list__desc">{{ part.description }}</div>
      </div>
    </div>

    <div v-else-if="card.partsForCustomer === 'Display Total Price Only'" class="list__inner"></div>

    <div v-else-if="card.partsForCustomer === 'Display Parts & Pricing'" class="list__inner">
      <div class="list__icon">
        <i v-if="part.isService || part.isLabour" class="i-monetization_on" :style="[part.isService ? 'color: #BA8AE7' : 'color: #2C9AFF']" />
        <i v-else class="i-build" />
      </div>
      <div class="list__info">
        <div class="list__desc">{{ part.description }}</div>
      </div>
      <div class="list__text amount">{{ formatter(part.price) }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PartCustomerView',
  props: {part: {type: Object}, card: {type: Object}}
}
</script>

<style scoped lang="scss">
@import 'src/assets/styles/_variables.scss';
.list {
  border-radius: 20px 20px 0px 0px;
  background-color: $color-white;
  &__wrap {
    @include border(16px);
  }
  &__icon {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    background: $color-grey-smoke;
    border-radius: 6px;
    i {
      font-size: 16px;
      color: $color-grey;
    }
    &.blue i {
      color: $color-blue;
    }
    &.violet i {
      color: $color-violet;
    }
  }
  &__item {
    &.hide {
      display: none;
    }
  }
  &__inner {
    display: grid;
    grid-template-columns: 36px 1fr 60px;
    column-gap: 12px;
    align-items: center;
    padding: 12px;
    &:nth-child(even) {
      background-color: $color-grey-smoke;

      .list__icon {
        background: $color-white;
      }
    }
    &.wide {
      grid-template-columns: 36px 1fr;
    }
  }
  &__text {
    @include font(14px, $color-grey-space, 600);
    &.amount {
      text-align: right;
    }
  }
  &__desc {
    padding-top: 4px;
    @include font(12px, $color-grey, 500);
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 21px 12px;
    border-radius: 0 0 16px 16px;
    background: $color-grey-space;
    & .list__text {
      @include font(14px, $color-white, 700);
    }
  }
}
</style>
