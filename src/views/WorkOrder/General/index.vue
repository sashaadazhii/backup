<template>
  <div class="general__wrapper">
    <div class="general__block">
      <Info />
    </div>
    <div class="general__block">
      <Notes />
    </div>
  </div>
</template>

<script>
import Info from './Info'
import Notes from './Notes'

export default {
  name: 'WorkOrderGeneral',
  components: {Info, Notes}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
