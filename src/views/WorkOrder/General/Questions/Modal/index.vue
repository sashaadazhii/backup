<template>
  <vue-final-modal v-slot="{close}">
    <div class="modal__wrapper">
      <div class="modal__header">
        <span>Questions</span>
        <div class="modal__header-btn" @click="open">
          <i class="i-settings_menu" />
          <span>Manage questions</span>
        </div>
        <Button icon="i-circle_close" border grey circle iconSize="20px" size="small" @click="close" />
      </div>
      <div class="modal__inner">
        <Block v-for="(group, idx) of questions" :key="idx" :group="group" :idx="idx" />
      </div>
      <div class="modal__btns">
        <Button class="modal__btn" label="Cancel" border @click="close" />
        <Button class="modal__btn" label="Save" @click="save" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Block from './Block'
import Edit from '../Edit'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'QuestionsModal',
  components: {Button, Block},
  computed: {
    ...mapState({
      questions: s => s.workOrder.questions.questions
    })
  },
  methods: {
    ...mapMutations({
      show: 'workOrder/questions/show'
    }),
    open() {
      this.$vfm.hide('Questions')
      this.$vfm.show({
        component: Edit,
        bind: {
          name: 'Edit'
        }
      })
    },
    save() {
      this.show(true)
      this.$vfm.hide('Questions')
    },
    close() {}
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
