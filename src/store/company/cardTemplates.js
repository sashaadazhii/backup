import axios from 'axios'
import _ from 'lodash'
import {cardsList} from '../data/cardTemplates'
import {vehicles as vehiclesList} from '../data/vehicles'

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
      console.log(state.templates)
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
      const search = state.searchParams?.toLocaleLowerCase() || ''
      const filteredCards = cardsList.data.filter(card => card.name.toLocaleLowerCase().includes(search))
      try {
        commit('pagination', cardsList.pagination)
        commit('set', filteredCards)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async fetchTemplate({commit}, id) {
      try {
        const template = cardsList.data.find(c => c.templateID === id)
        commit('setTemplate', template)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async add({commit}, template) {
      template.templateID = Date.now()
      template.relations ||= []
      if (template.vehicleUID) template.relations.push(vehiclesList.find(v => v.uid === template.vehicleUID))
      try {
        console.log(template)
        commit('add', template)
        return template
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, template) {
      try {
        commit('update', template)
        commit('setTemplate', template)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async remove({commit}, id) {
      try {
        commit('remove', id)
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
    }
  }
}
