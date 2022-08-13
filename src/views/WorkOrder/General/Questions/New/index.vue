<template>
  <vue-final-modal>
    <div class="modal__wrapper">
      <div class="modal__header">
        <i class="i-arrow_back" @click="back" />
        <i class="i-settings_menu" />
        <span>Manage questions</span>
      </div>
      <div class="modal__inner">
        <div class="group__wrapper">
          <div class="group__header">
            <div class="group__title">Group</div>
            <div class="group__btns">
              <Button label="Remove" border @click="back"/>
              <Button label="Save" @click="save" />
            </div>
          </div>
          <div class="group__body">
            <Input title="Enter group title" placeholder="Group title goes here..." />
            <div class="group__questions questions">
              <Question
                v-for="(question, idx) of questions"
                :key="idx"
                :question="question"
                :idx="idx"
                @changeTitle="changeTitle"
                @changeType="changeType"
                @addItem="addItem"
                @delItem="delItem"
              />
              <div class="questions__btn" @click="add">
                <i class="i-add_circle" />
                <span>Add question</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Question from './Question'
import Edit from '../Edit'
import Button from '@/components/Yaro/Button'
import Input from '@/components/Yaro/Input'

export default {
  name: 'QuestionsModal',
  components: {Button, Input, Question},
  data() {
    return {
      questions: [
        {
          title: null,
          type: 'Input field',
          list: []
        }
      ]
    }
  },

  methods: {
    back() {
      this.$vfm.hide('New')
      this.$vfm.show({
        component: Edit,
        bind: {
          name: 'Edit'
        }
      })
    },
    add() {
      const question = {title: null, type: 'Input field', list: []}
      this.questions.push(question)
    },
    save() {},
    changeTitle({value, idx}) {
      this.questions[idx].title = value
    },
    changeType({value, idx}) {
      if (value !== 'Input field') {
        this.questions[idx].list.length = 0
        this.questions[idx].list.push({option: null})
        this.questions[idx].list.push({option: null})
      }
      this.questions[idx].type = value
    },
    addItem(idx) {
      this.questions[idx].list.push({option: null})
    },
    delItem({index, idx}) {
      this.questions[idx].list.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
