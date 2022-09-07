import {guides} from '../data/guides'

export default {
  namespaced: true,

  state: {
    guides: guides,
    guide: {}
  },
  mutations: {
    set(state, guides) {
      state.guides = guides
    },
    setGuide(state, guide) {
      state.guide = guide
    },
    add(state, guide) {
      state.guides.push(guide)
      guides.push(guide)
    },
    update(state, guide) {
      const guideIdx = state.guides.findIndex(g => g.id === guide.id)
      state.guides.splice(guideIdx, 1, guide)
      guides.splice(guideIdx, 1, guide)
    },
    remove(state, id) {
      state.guides = state.guides.filter(g => g.id !== id)
      guides = guides.filter(g => g.id !== id)
    }
  },
  actions: {
    async fetch({commit}, id) {
      // const filteredGuides = guides.filter(g => g.serviceID === id)
      // commit('set', filteredGuides)
      commit('set', guides)
    }
  }
}
