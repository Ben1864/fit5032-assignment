import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'

export default createStore({
  state: {
    isAuthenticated: useStorage('isAuthenticated', false),
    user: useStorage('user', null),
    registeredUsers: useStorage('registeredUsers', [])
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    setUser(state, user) {
      state.user = user
    },
    registerUser(state, user) {
      state.registeredUsers.push(user)
    }
  },
  actions: {
    login({ commit, getters }, user) {
      //Return true if user logged in successfully
      const userEmail = user.email
      const userPassword = user.password
      const userFromEmail = getters.getUserByEmail(userEmail)
      console.log(userFromEmail)
      if (userFromEmail !== null && userFromEmail.password === userPassword) {
        commit('setAuthentication', true)
        commit('setUser', userFromEmail)
        return true
      }
      return false
    },
    logout({ commit }) {
      commit('setAuthentication', false)
      commit('setUser', null)
    },
    register({ commit, getters }, user) {
      //Return true if the user is successfully registered
      if (!getters.userAlreadyRegistered(user)) {
        commit('registerUser', user)
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
    }
  }
})
