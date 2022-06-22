import axios from 'axios'
import _ from 'lodash'

export default {
  namespaced: true,

  state: {
    templates: [],
    template: {},
    searchParams: null,
    pagination: {},
    page: 1
  },
  mutations: {
    set(state, templates) {
      state.templates = _.unionBy(state.templates, templates, 'templateID')
    },
    setTemplate(state, template) {
      state.template = template
    },
    setSearch(state, params) {
      state.searchParams = params
    },
    pagination(state, pagination) {
      state.pagination = pagination
    },
    changePage(state, page) {
      if (page) state.page = page
      else state.page++
    },
    reset(state) {
      state.templates = []
      state.page = 1
    },
    add(state, template) {
      state.templates.unshift(template)
    },
    update(state, template) {
      state.template = template
      const cardIdx = state.templates.findIndex(card => card.templateID === template.templateID)
      state.templates.splice(cardIdx, 1, template)
    },
    remove(state, id) {
      state.templates = state.templates.filter(template => template.templateID !== id)
    },
    removeService(state, templateID) {
      const card = state.templates.find(card => card.templateID === templateID)
      if (card) card.servicesCount--
    }
  },
  actions: {
    async fetch({commit, state}) {
      const url = process.env.VUE_APP_BACKEND
      const page = state.page
      const search = state.searchParams

      try {
        const templates = await axios.get(`${url}company/cards/`, {params: {page, search}})
        commit('pagination', templates.data.pagination)
        commit('set', templates.data.data)
        commit('changePage')
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
    async pickForVehicle({commit}, uid) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.get(`${url}company/cards/pick/${uid}/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async add({commit}, template) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/cards/`, template)
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
