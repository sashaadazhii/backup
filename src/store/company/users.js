import {users as usersList} from '../data/users'

export default {
  namespaced: true,

  state: {
    users: [],
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
      state.users = state.users.filter(u => u.id !== id)
    },
    add(state, user) {
      state.user = user
      state.users.unshift(user)
    },
    update(state, user) {
      let userUpdated = state.users.find(u => u.id === user.id)
      const idx = state.users.indexOf(userUpdated)
      state.users.splice(idx, 1, user)
    }
  },
  actions: {
    async fetch({commit}) {
      try {
        const users = usersList
        commit('pagination', users.pagination)
        commit('set', users)
      } catch (err) {
        commit('setError', err, {root: true})
        throw err
      }
    },
    async find({commit}, id) {
      try {
        const user = usersList.find(u => u.id === id)
        commit('setUser', user)
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
        user.id = Math.floor(Math.random() * 1000)
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
