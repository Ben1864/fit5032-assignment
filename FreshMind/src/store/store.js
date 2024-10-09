import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'
import { hashPassword, hashPasswordCompare } from '@/utils/hash'
import { auth, db } from '@/firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

export default createStore({
  state: {
    isAuthenticated: useStorage('isAuthenticated', false),
    adminList: ['ben@gmail.com', 'ridgesben1864@gmail.com'],
    isAdmin: useStorage('isAdmin', false),
    attendingEvents: useStorage('attendingEvents', []),
    userData: JSON.parse(useStorage('currentUser', null).value)
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin
    },
    addEvent(state, eventId) {
      state.attendingEvents.push(eventId)
    },
    removeEvent(state, eventId) {
      state.attendingEvents = state.attendingEvents.filter((element) => element != eventId)
    },
    setUserData(state, userData) {
      useStorage('currentUser').value = JSON.stringify(user)
    }
  },
  actions: {
    async login({ commit, getters, dispatch }, user) {
      // Return true if user logged in successfully
      const emailInput = user.email
      const passwordInput = user.password
      try {
        await signInWithEmailAndPassword(emailInput, passwordInput)
        await dispatch('getUserData', user)
        commit('setAuthentication', true)
        commit('setAdmin', getters.userIsAdmin(userFromEmail.email))
        return true
      } catch (error) {
        console.error('Error Logging in User: ', error)
        return false
      }
    },
    logout({ commit }) {
      signOut(auth)
      commit('setAuthentication', false)
      commit('setAdmin', false)
    },
    async register({ commit, getters, dispatch}, user) {
      //Return true if the user is successfully registered
      try{
        await createUserWithEmailAndPassword(auth, user.email, user.password)
        await dispatch('createUserData', user)
        commit('setAdmin', getters.userIsAdmin(user.email))
        commit('setAuthentication', true)
        return true
      }catch (error){
        console.log("Error creating user: ", error)
        return false
      }
    },
    async createUserData({ commit }, user){
      try{
        let userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            email: user.email
        }
        await setDoc(doc(db, 'users', auth.currentUser.uid), userData)
        commit('setUserData', userData)
        console.log("User Successfully stored")
      } catch (error) {
        console.log("Error creating user data: ", error)
      }
    },
    async getUserData({ commit }, user){
      try{
        const userDocRef = doc(db, 'users', auth.currentUser.uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          console.log('User data fetched successfully:', userDoc.data());
          commit('setUserData', userDoc.data())
        } else {
          console.log('No such user document!');
          userData = null; 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        userData = null;
      }

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
