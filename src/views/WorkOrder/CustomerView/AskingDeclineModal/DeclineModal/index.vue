<template>
  <vue-final-modal>
    <div class="modal">
      <div class="modal__icon"><i class="i-check_circle" /></div>
      <div class="modal__title">Thanks!</div>
      <div class="modal__text">Your decline is successfully submitted. We’ll be in touch.</div>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: 'DeclineModal',
  mounted() {
    setTimeout(() => {
      this.$vfm.hide('DeclineModal')
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
