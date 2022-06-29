<template>
  <div class="general__wrapper">
    <div class="general__block">
      <Info />
      <Settings />
    </div>
    <div class="general__block">
      <Notes />
    </div>
    <div class="general__block">
      <Scheduling />
    </div>
  </div>
</template>

<script>
import Info from './Info'
import Notes from './Notes'
import Settings from './Settings'
import Scheduling from './Scheduling'

export default {
  name: 'WorkOrderGeneral',
  components: {Info, Notes, Settings, Scheduling}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
