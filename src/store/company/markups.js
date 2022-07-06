import {markups as markupsList} from '../data/markups'
export default {
  namespaced: true,

  state: {
    markups: markupsList,
    markup: {}
  },
  mutations: {
    set(state, markups) {
      state.markups = markups
    },
    setMarkup(state, markup) {
      state.markup = markup
    },
    add(state, markup) {
      state.markups.unshift(markup)
    }
  },
  actions: {}
}
