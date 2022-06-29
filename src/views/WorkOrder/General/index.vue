<template>
  <div class="general__wrapper">
    <div class="general__block">
      <Info />
      <Settings />
    </div>
    <div class="general__block">
      <Notes />
    </div>
  </div>
</template>

<script>
import Info from './Info'
import Notes from './Notes'
import Settings from './Settings'

export default {
  name: 'WorkOrderGeneral',
  components: {Info, Notes, Settings}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
