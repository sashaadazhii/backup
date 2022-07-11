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
    <div class="general__block">
      <Options />
      <Questions />
      <Requests />
    </div>
  </div>
</template>

<script>
import Info from './Info'
import Notes from './Notes'
import Settings from './Settings'
import Scheduling from './Scheduling'
import Options from './Options'
import Requests from './Requests'
import Questions from './Questions'

export default {
  name: 'WorkOrderGeneral',
  components: {Info, Settings, Notes, Scheduling, Options, Requests, Questions}
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
