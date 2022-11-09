<template>
  <div class="field__wrapper">
    <div class="field__title">Field {{ idx + 1 }}</div>
    <Input
      :modelValue="field.title"
      :title="`Enter field ${idx + 1} title`"
      placeholder="Label"
      @update:modelValue="$emit('changeTitle', {value: $event, idx})"
    />
    <!-- <Dropdown :modelValue="field.type" :options="types" title="Choose answer type" @update:modelValue="$emit('changeType', {value: $event, idx})" /> -->
    <div class="options__list" v-if="field.type !== 'Input'">
      <Draggable :list="field.list" class="options__drug" handle=".drug" item-key="name">
        <template #item="{element, index}">
          <div class="options__item item">
            <div class="item__title">option {{ index + 1 }}</div>
            <i class="i-drag_indicator drug" />
            <Input v-model="element.option" placeholder="Label" />
            <Button icon="i-remove_circle_outline" border size="large" @click="$emit('delItem', {index, idx})" :disabled="field.list.length <= 2" />
          </div>
        </template>
      </Draggable>
      <div v-if="field.list.length < 10" class="options__btn" @click="$emit('addItem', idx)">
        <i class="i-add_circle" />
        <span>Add {{ field.type }} option</span>
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
  components: {Input, Button, Draggable},
  props: {
    field: {
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
      type: 'Drop-Down',
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
