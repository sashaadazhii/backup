<template>
  <div class="block__wrapper">
    <div class="block__header">
      <span>Card has has extra options</span>
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
      <div class="fields__btn" @click="add">
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
  created() {
    // if (this.localQuestions.id) {
    //   const {title, blocks, id, time} = this.localQuestions
    //   this.id = id
    //   this.title = title
    //   this.time = time
    //   this.questions = blocks
    //   this.questions.forEach(q => {
    //     if (q.list && q.list.length) q.list = q.list.map(l => ({option: l}))
    //   })
    // }
  },
  computed: {
    ...mapState({
      // localQuestions: s => s.workOrder.questions.activeQuestions
    })
  },
  methods: {
    ...mapMutations({
      // addQuestions: 'workOrder/questions/add',
      // update: 'workOrder/questions/update'
    }),
    // back() {
    //   this.$vfm.hide('New')
    //   this.$vfm.show({
    //     component: Edit,
    //     bind: {
    //       name: 'Edit'
    //     }
    //   })
    // },
    add() {
      const field = {title: null, type: 'Input', list: []}
      this.fields.push(field)
    },
    // save() {
    //   const {title, questions, id} = this
    //   questions.forEach(q => {
    //     if (q.list) q.list = q.list.map(l => l.option)
    //   })
    //   const group = {
    //     title,
    //     blocks: [...questions]
    //   }
    //   if (!id) {
    //     group.id = this.$getID()
    //     this.addQuestions(group)
    //   } else {
    //     group.id = id
    //     this.update(group)
    //   }
    //   this.back()
    // },
    // remove() {
    //   this.title = ''
    //   this.field = [
    //     {
    //       title: null,
    //       type: 'Input',
    //       list: []
    //     }
    //   ]
    // },
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
