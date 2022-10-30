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
      <div class="part__wrapper">
        <div class="part__header">
          <i class="i-archive" />
          <span>Assign bin for parts</span>
        </div>
        <div class="part__label" :class="{'-disablec': !isStart}">
          <input v-model="binValue" v-maska="'######'" type="text" class="part__input" placeholder="Enter bin number" />
          <Button v-if="bin" label="Reset" class="part__btn -grey" size="mini" @click="bin = null" />
          <Button v-else label="Assign" class="part__btn" size="mini" />
        </div>
      </div>
      <Requests />
    </div>
  </div>
</template>

<script>
import Info from './Info'
import Notes from './Notes'
import Settings from './Settings'
import Requests from './Requests'
import Button from '@/components/Yaro/Button'
import {mapMutations} from "vuex";

export default {
  name: 'WorkOrderGeneral',
  components: {Info, Settings, Notes, Requests, Button},
    data() {
        return {
            bin: null
        }
    },
    computed: {
        binValue: {
            set(val) {
                this.bin = val
                this.change( { bin: this.bin } )
            },
            get() {
                return this.bin
            }
        }
    },
    methods: {
        ...mapMutations({
            change: 'workOrder/change'
        }),
    },
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
