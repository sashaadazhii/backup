<template>
  <div class="block__wrapper">
    <div class="block__header">
      <span>Card has extra options</span>
      <Switch v-model="hasOptions" />
    </div>
    <div class="block__fields fields" :class="{'-disabled': !hasOptions}">
      <Field
        v-for="(field, idx) of fields"
        :key="idx"
        :field="field"
        :idx="idx"
        @changeTitle="changeTitle"
        @changeType="changeType"
        @addItem="addItem"
        @delItem="delItem"
      />
      <div v-if="fields.length < 4" class="fields__btn" @click="add">
        <i class="i-add_circle" />
        <span>Add field</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Field from './Field'
import Switch from '@/components/Yaro/Switch'

export default {
  name: 'QuestionsModal',
  components: {Switch, Field},
  data() {
    return {
      hasOptions: true,
      title: '',
      id: null,
      fields: [
        {
          title: null,
          type: 'Drop-Down',
          list: [{option: null}, {option: null}, {option: null}]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      options: s => s.company.card.card.options
    })
  },
  methods: {
    ...mapMutations({
      setOptions: 'company/card/setOptions'
    }),
    add() {
      const field = {title: null, type: 'Drop-Down', list: [{option: null}, {option: null}, {option: null}]}
      this.fields.push(field)
    },
    changeTitle({value, idx}) {
      this.fields[idx].title = value
    },
    changeType({value, idx}) {
      if (value !== 'Input field') {
        this.fields[idx].list.length = 0
        this.fields[idx].list.push({option: null})
        this.fields[idx].list.push({option: null})
      }
      this.fields[idx].type = value
    },
    addItem(idx) {
      if (this.fields[idx].list.length >= 10) return
      this.fields[idx].list.push({option: null})
    },
    delItem({index, idx}) {
      this.fields[idx].list.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style';
</style>
