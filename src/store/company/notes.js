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
    setNote(state, note) {
      state.note = note
    },
    add(state, notes) {
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
    async fetch({commit}, id) {
      const filteredNotes = notes.filter(n => n.templateID === id)
      commit('set', filteredNotes)
    }
  }
}
