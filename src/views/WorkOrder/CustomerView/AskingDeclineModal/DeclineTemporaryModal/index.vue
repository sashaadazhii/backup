<template>
  <vue-final-modal>
    <div class="modal">
      <div class="modal__icon"><i class="i-timer" /></div>
      <div class="modal__title">Thanks!</div>
      <div class="modal__text">Your order has been postponed until the next visit!</div>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: 'DeclineTemporaryModal',
  mounted() {
    setTimeout(() => {
      this.$vfm.hide('DeclineTemporaryModal')
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
