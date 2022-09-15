<template>
  <div class="note__wrapper">
    <Textarea v-model="text" placeholder="Start typing here..." height="120" />
    <div class="note__footer">
      <div class="note__footer-top">
        <Switch v-model="isTemplate" textLeft :label="note ? 'Save edits to template' : 'Save as a template'" />
      </div>
      <div class="note__footer-bottom">
        <Button :label="note ? 'Save' : 'Add Note'" @click="save" />
        <Button label="Cancel" border @click="$emit('close')" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Textarea from '@/components/Yaro/Textarea'
import Switch from '@/components/Yaro/Switch'
import {mapState, mapMutations} from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'CardPageNote',
  components: {Button, Textarea, Switch},
  emits: ['close'],
  props: {
    note: Object
  },
  data() {
    return {
      isTemplate: false,
      text: ''
    }
  },
  created() {
    if (this.note) {
      this.text = this.note.text
    }
  },
  computed: {
    ...mapState({
      cardID: s => s.company.cards.card.templateID
    })
  },
  methods: {
    ...mapMutations({
      add: 'company/notes/add',
      edit: 'company/notes/update'
    }),
    save() {
      const note = {
        templateID: this.cardID,
        id: this.note?.id || this.$getID(),
        date: this.note?.date || dayjs().format('DD MMM YYYY at hh:mm A'),
        author: this.note?.author || 'Alex',
        alias: this.note?.alias || 'A',
        text: this.text
      }
      if (this.note) {
        this.edit(note)
      } else {
        this.add(note)
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
