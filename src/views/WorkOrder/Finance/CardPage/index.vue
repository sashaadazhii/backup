<template>
  <div class="finance__wrapper">
    <Info />
    <Notes />
  </div>
</template>

<script>
import Info from './Info'
import Notes from './Notes'

export default {
  name: 'FinanceCardPage',
  components: {Info, Notes}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
