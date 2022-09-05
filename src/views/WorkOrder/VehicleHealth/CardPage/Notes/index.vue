<template>
  <div class="block__wrapper">
    <div class="block__header">
      <Input v-model="searchValue" iconLeft="i-search1" type="search" size="medium" ref="input" @click="open" @input="search" />
      <Button icon="i-add_circle" label="New Note" @click="showNew = true" />
    </div>
    <div class="block__body">
      <NewNote v-if="showNew" @close="close" />
      <Note v-for="note of notes" :key="note.id" :note="note" />
    </div>
    <Popup v-model:visible="display" :targetElement="target" :notes="listNotes" />
  </div>
</template>

<script>
import Input from '@/components/Yaro/Input'
import Button from '@/components/Yaro/Button'
import Note from './Note'
import NewNote from './NewNote'
import {mapState, mapMutations, mapActions} from 'vuex'
import Popup from './Popup'

export default {
  name: 'CardPageNotes',
  components: {Input, Button, Note, NewNote, Popup},
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
    await this.fetch(this.cardID)
    this.localNotes = await this.fetchAll()
  },
  computed: {
    ...mapState({
      cardID: s => s.company.cards.card.templateID,
      notes: s => s.company.notes.notes
    }),
    listNotes() {
      const filteredNotes = []
      const notesIDs = this.notes.map(n => n.id)
      this.localNotes.forEach(note => {
        if (notesIDs.some(n => n === note.id)) return
        filteredNotes.push(note)
      })
      return filteredNotes.filter(n => n.text.includes(this.searchValue))
    }
  },
  methods: {
    ...mapActions({
      fetch: 'company/notes/fetch',
      fetchAll: 'company/notes/fetchAll'
    }),
    async close() {
      this.showNew = false
      // this.notes = await this.fetch(this.cardID)
    },
    open(e) {
      if (e === '' && this.display) {
        this.display = false
        this.target = null
        return
      }
      this.target = this.$refs.input.$el
      this.display = true
    },
    async search(e) {
      // const notes = this.localNotes
      // this.listNotes = notes.filter(n => n.text.includes(e))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
