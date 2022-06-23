<template>
  <div class="page-inner">
    <Header />
    <div class="reports__wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Header from './Header'

export default {
  name: 'ReportsPage',
  components: {Header}
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
