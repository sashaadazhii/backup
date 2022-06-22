<template>
  <div class="header__wrapper">
    <div class="container">
      <div class="header__inner">
        <button class="btn btn--fill" @click="openNewOrderModal">New Work Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import NewOrderModal from '@/components/NewOrderModal'

export default {
  name: 'TheHeader',
  methods: {
    openNewOrderModal() {
      this.$vfm.show({
        component: NewOrderModal,
        bind: {
          name: 'NewOrderModal',
          'click-to-close': false,
          'hide-overlay': true,
          'focus-trap': true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
