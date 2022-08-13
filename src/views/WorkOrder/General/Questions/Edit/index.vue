<template>
  <vue-final-modal>
    <div class="modal__wrapper">
      <div class="modal__header">
        <i class="i-arrow_back" @click="back" />
        <i class="i-settings_menu" />
        <span>Manage questions</span>
        <div class="modal__header-btn" @click="open">
          <i class="i-add_circle" />
          <span>Add new group</span>
        </div>
      </div>
      <div class="modal__inner">
        <Block v-for="(group, idx) of questions" :key="idx" :group="group" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Block from './Block'
import Questions from '../Modal'
import New from '../New'

export default {
  name: 'QuestionsModal',
  components: {Block},
  computed: {
    ...mapState({
      questions: s => s.workOrder.questions.questions
    })
  },
  methods: {
    ...mapMutations({
      // setErrors: 'company/card/setErrors',
    }),
    open() {
      this.$vfm.hide('Questions')
      this.$vfm.show({
        component: New,
        bind: {
          name: 'New'
        }
      })
    },
    back() {
      this.$vfm.hide('Edit')
      this.$vfm.show({
        component: Questions,
        bind: {
          name: 'Questions'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
