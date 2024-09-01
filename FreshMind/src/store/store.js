import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'
import { hashPassword, hashPasswordCompare } from '@/utils/hash'

export default createStore({
  state: {
    isAuthenticated: useStorage('isAuthenticated', false),
    currentUser: JSON.parse(useStorage('currentUser', null).value),
    registeredUsers: useStorage('registeredUsers', []),
    adminList: ['ben@gmail.com', 'ridgesben1864@gmail.com'],
    isAdmin: useStorage('isAdmin', false),
    attendingEvents: useStorage('attendingEvents', [])
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    setCurrentUser(state, user) {
      useStorage('currentUser').value = JSON.stringify(user)
    },
    registerUser(state, user) {
      state.registeredUsers.push(user)
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin
    },
    addEvent(state, eventId) {
      state.attendingEvents.push(eventId)
    },
    removeEvent(state, eventId) {
      state.attendingEvents = state.attendingEvents.filter((element) => element != eventId)
    }
  },
  actions: {
    async login({ commit, getters }, user) {
      // Return true if user logged in successfully
      const emailInput = user.email
      const passwordInput = user.password
      const userFromEmail = getters.getUserByEmail(emailInput)
      if (userFromEmail !== null) {
        try {
          // Compare the provided password with the stored hashed password
          const isMatch = await hashPasswordCompare(passwordInput, userFromEmail.password)
          if (isMatch) {
            commit('setAuthentication', true)
            commit('setCurrentUser', userFromEmail)
            commit('setAdmin', getters.userIsAdmin(userFromEmail.email))
            return true
          }
        } catch (error) {
          console.error('Error comparing passwords:', error)
          return false
        }
      }
      return false
    },
    logout({ commit }) {
      commit('setAuthentication', false)
      commit('setCurrentUser', null)
      commit('setAdmin', false)
    },
    async register({ commit, getters }, user) {
      //Return true if the user is successfully registered
      if (!getters.userAlreadyRegistered(user)) {
        user.password = await hashPassword(user.password)
        console.log(user.email)
        commit('registerUser', user)
        commit('setAdmin', getters.userIsAdmin(user.email))
        return true
      }
      return false
    },
    attendEvent({ commit, getters }, event) {
      if (!getters.userIsAttending(event)) {
        commit('addEvent', event.id)
        return true
      }
      return false
    },
    unattendEvent({ commit, getters }, event) {
      if (getters.userIsAttending(event)) {
        commit('removeEvent', event.id)
        return true
      }
      return false
    }
  },
  getters: {
    userAlreadyRegistered: (state) => (user) => {
      if (state.registeredUsers.length < 1) {
        return false
      }
      return state.registeredUsers.some((registeredUser) => registeredUser.email === user.email)
    },
    getUserByEmail: (state) => (email) => {
      return state.registeredUsers.find((user) => user.email === email) || null
    },
    userIsAdmin: (state) => (userEmail) => {
      //True if users email is in admin list
      return state.adminList.includes(userEmail)
    },
    userIsAttending: (state) => (event) => {
      return state.attendingEvents.includes(event.id)
    }
  }
})
