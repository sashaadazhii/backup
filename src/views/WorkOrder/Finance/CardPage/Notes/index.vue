<template>
  <div class="notes__wrapper">
    <div class="notes__header">
      <div class="notes__title">Canned Notes</div>
      <Button icon="i-add_circle" label="New Note" @click="showNew = true" grey />
    </div>
    <div class="notes__body">
      <NewNote v-if="showNew" @close="close" />
      <Note v-for="note of notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Yaro/Button'
import Note from './Note'
import NewNote from './NewNote'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: 'CardPageNotes',
  components: {Button, Note, NewNote},
  data() {
    return {
      showNew: false,
      display: false,
      target: null,
      localNotes: [],
      searchValue: ''
    }
  },
  async created() {
    await this.fetchAll()
  },
  computed: {
    ...mapState({
      cardID: s => s.company.cards.card.templateID,
      notes: s => s.company.notes.notes
    })
  },
  methods: {
    ...mapActions({
      fetch: 'company/notes/fetch',
      fetchAll: 'company/notes/fetchAll'
    }),
    async close() {
      this.showNew = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
