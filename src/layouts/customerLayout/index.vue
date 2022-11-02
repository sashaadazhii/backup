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
  max-width: 440px;
  margin: 0 auto;
}
.page-wrapper {
  background-color: $color-white;
  overflow: hidden;
}
</style>
