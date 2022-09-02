import {notes} from '../data/notes'

export default {
  namespaced: true,

  state: {
    notes: notes,
    note: {}
  },
  mutations: {
    set(state, notes) {
      state.notes = notes
    },
    add(state, notes) {
      state.notes.push(notes)
      state.notes.push(notes)
    },
    update(state, note) {
      const noteIdx = state.notes.findIndex(n => n.id === note.id)
      state.notes.splice(noteIdx, 1, note)
    },
    remove(state, id) {
      state.notes = state.notes.filter(n => n.id !== id)
    }
  },
  actions: {
    async fetch(_, id) {
      return notes.filter(n => n.templateID === id )
    }
  }
}
