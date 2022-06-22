import axios from 'axios'

export default {
  namespaced: true,

  state: {
    services: [],
    service: {},
    localService: null,
    activeService: {}
  },
  mutations: {
    set(state, services) {
      state.services = services
    },
    setService(state, service) {
      state.service = service
    },
    setActiveService(state, service) {
      state.activeService = service
    },
    createService(state, service) {
      state.localService = service
    },
    add(state, service) {
      state.services.unshift(service)
    },
    update(state, service) {
      if (state.activeService.id) state.activeService = service
      const serIdx = state.services.findIndex(ser => ser.id === service.id)
      state.services.splice(serIdx, 1, service)
    },
    remove(state, id) {
      state.services = state.services.filter(service => service.id !== id)
    },
    removePart(state, {id, serviceID}) {
      const service = state.services.find(ser => ser.id === serviceID)
      const partIdx = service.parts.findIndex(p => p.id === id)
      service.parts.splice(partIdx, 1)
    }
  },
  actions: {
    async fetch({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const services = await axios.get(`${url}company/cards/${id}/services/`)
        commit('set', services.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, {id, service}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.post(`${url}company/cards/${id}/services/`, service)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {id, templateID, service}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.put(`${url}company/cards/${templateID}/services/${id}/`, service)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, {id, templateID}) {
      const url = process.env.VUE_APP_BACKEND
      try {
        return await axios.delete(`${url}company/cards/${templateID}/services/${id}/`)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
