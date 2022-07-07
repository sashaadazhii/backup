import axios from 'axios'
import {users as usersList} from '../data/users'

export default {
  namespaced: true,

  state: {
    users: usersList,
    searchingUsers: [],
    technicians: [],
    user: {},
    pagination: {},
    page: 1
  },
  mutations: {
    set(state, users) {
      state.users = users
    },
    setUser(state, user) {
      state.user = user
    },
    setTechs(state, users) {
      state.technicians = users
    },
    pagination(state, pagination) {
      state.pagination = pagination
    },
    changePage(state, page) {
      if (page) state.page = page
      else state.page++
    },
    reset(state) {
      state.users = []
      state.page = 1
    },
    remove(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    },
    add(state, user) {
      state.users.unshift(user)
    },
    update(state, user) {
      const userIdx = state.users.findIndex(u => u.id === user.id)
      state.users.splice(userIdx, 1, user)
    }
  },
  actions: {
    async fetch({commit, state}) {
      try {
        const users = state.users
        commit('pagination', users.pagination)
        commit('set', users)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, id) {
      const url = process.env.VUE_APP_BACKEND
      try {
        const user = await axios.get(`${url}company/users/${id}`)
        commit('setUser', user.data)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async search({commit}, params) {
      try {
        if (params?.role) return usersList.filter(u => u.role === params.role)
        return [...usersList]
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async create({commit}, user) {
      try {
        commit('add', user)
        return user
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async update({commit}, user) {
      try {
        commit('update', user)
        return user
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async delete({commit}, id) {
      try {
        commit('remove', id)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    }
  }
}
