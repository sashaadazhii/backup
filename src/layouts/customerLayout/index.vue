<template>
  <div class="customer-layout layout">
    <div class="page-wrapper customer-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerLayout'
}
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/_variables.scss';

.customer-layout {
  display: grid;
  width: 100%;
}
.page-wrapper {
  overflow: hidden;
  background: url('../../assets/images/mobile-bg.svg') 50% no-repeat;
  background-size: contain;
  height: 740px;
  max-width: 340px;
  margin: auto;
  filter: drop-shadow(0px 12.2059px 104.622px rgba(0, 0, 0, 0.35));
}
</style>
