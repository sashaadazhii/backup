import {markups as markupsList} from '../data/markups'
export default {
  namespaced: true,

  state: {
    markups: markupsList
  },
  mutations: {
    set(state, markups) {
      state.markups = markups
    }
  },
  actions: {}
}
