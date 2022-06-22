import axios from 'axios'

export default {
  namespaced: true,

  state: {
    media: []
  },
  mutations: {
    set(state, media) {
      state.media = media
    }
  },
  actions: {
    async fetch({commit}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const media = await axios.get(`${url}company/media/`)
        commit('set', media.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async upload({commit}, media) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/media/`, media)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.delete(`${url}company/media/${id}/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
