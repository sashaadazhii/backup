import axios from 'axios'
import {partsList} from '../data/parts'

export default {
  namespaced: true,

  state: {
    parts: [],
    localPart: {}
  },
  mutations: {
    set(state, parts) {
      state.parts = parts
    },
    createPart(state, part) {
      state.parts.unshift(part)
    },
    add(state, part) {
      state.parts.unshift(part)
    },
    removeLocalPart(state) {
      state.parts.splice(0, 1)
    },
    remove(state, id) {
      state.parts = state.parts.filter(part => part.id !== id)
    },
    update(state, newPart) {
      const partIdx = state.parts.findIndex(part => part.id === newPart.id)
      state.parts.splice(partIdx, 1, newPart)
    }
  },
  actions: {
    async fetch({commit}, id) {
      try {
        const parts = partsList.filter(p => p.serviceID === id)
        commit('set', parts)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, {id, part}) {
      try {
        commit('add', part)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {id, serviceID, part}) {
      // const url = process.env.VUE_APP_BACKEND
      try {
        // return await axios.put(`${url}company/services/${serviceID}/parts/${id}/`, part)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, {id, serviceID}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.delete(`${url}company/services/${serviceID}/parts/${id}/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
