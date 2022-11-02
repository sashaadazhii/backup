<template>
  <vue-final-modal>
    <div class="modal">
      <div class="modal__icon"><i class="i-check_circle" /></div>
      <div class="modal__title">Thanks!</div>
      <div class="modal__text">Your approval is successfully submitted. We’ll be in touch.</div>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: 'ApproveModal',
  mounted() {
    setTimeout(() => {
      this.$vfm.hide('ApproveModal')
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
