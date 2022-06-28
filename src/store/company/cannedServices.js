import axios from 'axios'
import {serviceList} from '../data/cannedServices'

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
      serviceList.unshift(service)
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
    },

  },
  actions: {
    async fetch({commit}, id) {
      try {
        const services = serviceList.filter(s => s.templateID === id)
        commit('set', services)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, id) {
      try {
        const services = serviceList.find(s => s.id === id)
        commit('set', services)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, {id, service}) {
      try {
        commit('add', service)
        commit('company/cardTemplates/incrementService', id, {root: true})
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, {id, templateID, service}) {
      console.log(service)
      try {
        commit('update', service)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, {id, templateID}) {
      try {
        commit('remove', id)
        commit('company/cardTemplates/decrementService', templateID, {root: true})
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
