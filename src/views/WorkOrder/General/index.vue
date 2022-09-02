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
      <div class="part__wrapper">
        <div class="part__header">
          <i class="i-archive" />
          <span>Assign bin for parts</span>
        </div>
        <div class="part__label" :class="{'-disablec': !isStart}">
          <input v-model="bin" v-maska="'######'" type="text" class="part__input" placeholder="Enter bin number" />
          <Button v-if="bin" label="Reset" class="part__btn -grey" size="mini" @click="bin = null" />
          <Button v-else label="Assign" class="part__btn" size="mini" />
        </div>
      </div>
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
import Requests from './Requests'
import Questions from './Questions'
import Button from '@/components/Yaro/Button'

export default {
  name: 'WorkOrderGeneral',
  components: {Info, Settings, Notes, Scheduling, Requests, Questions, Button},
  data() {
    return {
      bin: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
