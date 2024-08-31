import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'

export default createStore({
  state: {
    isAuthenticated: useStorage('isAuthenticated', false),
    currentUser: useStorage('user', null),
    registeredUsers: useStorage('registeredUsers', []),
    adminList: ['ben@gmail.com', 'ridgesben1864@gmail.com'],
    isAdmin: useStorage('isAdmin', false),
    attendingEvents: useStorage('attendingEvents', [])
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    setUser(state, user) {
      state.currentUser = user
    },
    registerUser(state, user) {
      state.registeredUsers.push(user)
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin
    },
    addEvent(state, event) {
      state.attendingEvents.push(event)
    }
  },
  actions: {
    login({ commit, getters }, user) {
      //Return true if user logged in successfully
      const userEmail = user.email
      const userPassword = user.password
      const userFromEmail = getters.getUserByEmail(userEmail)
      if (userFromEmail !== null && userFromEmail.password === userPassword) {
        commit('setAuthentication', true)
        commit('setUser', userFromEmail)
        commit('setAdmin', getters.userIsAdmin(userFromEmail))
        return true
      }
      return false
    },
    logout({ commit }) {
      commit('setAuthentication', false)
      commit('setUser', null)
      commit('setAdmin', false)
    },
    register({ commit, getters }, user) {
      //Return true if the user is successfully registered
      if (!getters.userAlreadyRegistered(user)) {
        commit('registerUser', user)
        commit('setAdmin', getters.userIsAdmin(userFromEmail))
        return true
      }
      return false
    }
  },
  getters: {
    userAlreadyRegistered: (state) => (user) => {
      state.registeredUsers = []
      if (state.registeredUsers.length < 1) {
        return false
      }
      return state.registeredUsers.some((registeredUser) => registeredUser.email === user.email)
    },
    getUserByEmail: (state) => (email) => {
      return state.registeredUsers.find((user) => user.email === email) || null
    },
    userIsAdmin: (state) => (user) => {
      //True if users email is in admin list
      return state.adminList.includes(user.email)
    },
    userIsAttending: (state) => (event) => {
      return state.attendingEvents.includes(event.id)
    }
  }
})
