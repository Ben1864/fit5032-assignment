import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'

export default createStore({
  state: {
    isAuthenticated: useStorage('isAuthenticated', false),
    user: useStorage('user', null),
    registeredUsers: useStorage('registeredUsers', []),
    adminList: ['ben@gmail.com', 'ridgesben1864@gmail.com'],
    isAdmin: useStorage('isAdmin', false)
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
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin
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
      console.log(state.adminList)
      console.log(user.email)
      return state.adminList.includes(user.email)
    }
  }
})
