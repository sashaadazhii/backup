<template>
  <div class="question__wrapper">
    <div class="question__title">Question {{ idx + 1 }}</div>
    <Input
      :modelValue="question.title"
      title="Enter question title"
      placeholder="Question title goes here..."
      @update:modelValue="$emit('changeTitle', {value: $event, idx})"
    />
    <Dropdown :modelValue="question.type" :options="types" title="Choose answer type" @update:modelValue="$emit('changeType', {value: $event, idx})" />
    <div class="options__list" v-if="question.type !== 'Input'">
      <Draggable :list="question.list" class="options__drug" handle=".drug" item-key="name">
        <template #item="{element, index}">
          <div class="options__item item">
            <div class="item__title">{{ question.type }} option {{ element.name }} {{ index + 1 }}</div>
            <i class="i-drag_indicator drug" />
            <Input v-model="element.option" placeholder="" />
            <Button icon="i-remove_circle_outline" border size="large" @click="$emit('delItem', {index, idx})" :disabled="question.list.length <= 2" />
          </div>
        </template>
      </Draggable>
      <div class="options__btn" @click="$emit('addItem', idx)">
        <i class="i-add_circle" />
        <span>Add {{ question.type }} option</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import Dropdown from '@/components/Yaro/Dropdown'
import Draggable from 'vuedraggable'

export default {
  name: 'QuestionsModalBlock',
  components: {Input, Dropdown, Button, Draggable},
  props: {
    question: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      type: 'Input',
      types: ['Input', 'Drop-Down', 'Select'],
      list: [{option: null}, {option: null}]
    }
  },

  computed: {
    ...mapState({
      // card: s => s.company.card.card
    })
  },
  methods: {
    ...mapMutations({
      // setErrors: 'company/card/setErrors',
    }),
    add() {
      const option = {option: null}
      this.list.push(option)
    },
    del(idx) {
      this.list.splice(idx, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
