<template>
  <div class="note__wrapper">
    <Textarea v-model="text" placeholder="Start typing here..." />
    <div class="note__footer">
      <Button label="Add Note" @click="save" />
      <Button label="Cancel" border @click="$emit('close')" />
      <div class="note__switch">
        <!-- <span>Save edits to template</span> -->
        <span>Save as a template</span>
        <Switch v-model="isTemplate" />
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
  data() {
    return {
      isTemplate: false,
      text: ''
    }
  },
  computed: {
    ...mapState({
      cardID: s => s.company.cards.card.templateID
    })
  },
  methods: {
    ...mapMutations({
      add: 'company/notes/add'
    }),
    save() {
      const note = {
        templateID: this.cardID,
        id: this.$getID(),
        date: dayjs().format('DD MMM YYYY at hh:mm A'),
        author: 'Alex',
        alias: 'A',
        text: this.text
      }
      this.add(note)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
