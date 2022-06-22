import axios from 'axios'

export default {
  namespaced: true,

  state: {
    settings: {}
  },
  mutations: {
    set(state, settings) {
      state.settings = settings
    }
  },
  actions: {
    async fetch({commit}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const settings = await axios.get(url + `company/settings/`)
        commit('set', settings.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, settings) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.put(url + `company/settings/`, settings)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
