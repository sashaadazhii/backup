import axios from 'axios'

export default {
  namespaced: true,

  state: {
    contents: [],
    content: {},
    activeGuide: null
  },
  mutations: {
    set(state, contents) {
      state.contents = contents
    },
    setContent(state, content) {
      state.content = content
    },
    reset(state) {
      state.contents = []
    }
    // remove(state, id) {
    //   state.templates = state.templates.filter(template => template.templateID !== id)
    // }
  },
  actions: {
    async fetch({commit}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const contents = await axios.get(`${url}company/content/`, {
          params: {relationId: 42, relationType: 'canned-service'}
        })
        commit('set', contents.data)
        // commit('changePage')
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchTemplate({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const template = await axios.get(`${url}company/cards/${id}/`)
        commit('setTemplate', template.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, content) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/content/`, content)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {template, id}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.put(`${url}company/cards/${id}/`, template)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async remove({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        await axios.delete(`${url}company/cards/${id}/`)
        commit('remove', id)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
