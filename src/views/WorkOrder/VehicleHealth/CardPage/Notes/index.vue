<template>
  <div class="block__wrapper">
    <div class="block__header">
      <Input iconLeft="i-search1" type="search" size="medium" />
      <Button icon="i-add_circle" label="New Note" @click="showNew = true" />
    </div>
    <div class="block__body">
      <NewNote v-if="showNew" @close="close" />
      <Note v-for="note of notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script>
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import Note from './Note'
import NewNote from './NewNote'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'CardPageNotes',
  components: {Input, Button, Note, NewNote},
  data() {
    return {
      showNew: false
    }
  },
  async created() {
    await this.fetch(this.cardID)
  },
  computed: {
    ...mapState({
      cardID: s => s.company.cards.card.templateID,
      notes: s => s.company.notes.notes
    })
  },
  methods: {
    ...mapActions({
      fetch: 'company/notes/fetch'
    }),
    async close() {
      this.showNew = false
      // this.notes = await this.fetch(this.cardID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
