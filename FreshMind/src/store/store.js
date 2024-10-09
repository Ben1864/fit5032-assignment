import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'
import { hashPassword, hashPasswordCompare } from '@/utils/hash'
import { auth, db } from '@/firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

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
    attendingEvent(state, eventId) {
      state.attendingEvents.push(eventId)
    },
    removeAttendingEvent(state, eventId) {
      state.attendingEvents = state.attendingEvents.filter((element) => element != eventId)
    },
    removeAllAttendingEvents(state){
      state.attendingEvents = []
    },
    setUserData(state, userData) {
      useStorage('currentUser').value = JSON.stringify(userData)
    }
  },
  actions: {
    async login({ commit, getters, dispatch }, user) {
      // Return true if user logged in successfully
      const emailInput = user.email
      const passwordInput = user.password
      try {
        await signInWithEmailAndPassword(auth, emailInput, passwordInput)
        await dispatch('getUserData', user)
        commit('setAuthentication', true)
        commit('setAdmin', getters.userIsAdmin(emailInput))

        return true
      } catch (error) {
        console.error('Error Logging in User: ', error)
        return false
      }
    },
    logout({ commit }) {
      signOut(auth)
      commit('setUserData', null)
      commit('setAuthentication', false)
      commit('setAdmin', false)
      commit('removeAllAttendingEvents');

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
          console.log('User data fetched successfully: ', userDoc.data());
          await commit('setUserData', userDoc.data())
          if (userDoc.data().attendingEvents){
            const attendingEvents = userDoc.data().attendingEvents;

            // Loop through each event and commit it to the Vuex store
            attendingEvents.forEach(event => {
              commit('attendingEvent', event);
            });
          }
        } else {
          console.log('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

    },
    async attendEvent({ commit, getters }, event) {
      try{
        if (!getters.userIsAttending(event)) {
          commit('attendingEvent', event.id)
          // Reference to the user's document in Firestore
          const userRef = doc(db, 'users', auth.currentUser.uid);

          // Update the user's document by adding the event to attendingEvents array
          await updateDoc(userRef, {
            attendingEvents: arrayUnion(event.id)
          });
          
          return true
        }
        return false
      } catch (error) {
        console.error("Error adding event to user: ", error);
      }
    },
    async unattendEvent({ commit, getters }, event) {
      try{
        if (getters.userIsAttending(event)) {
          commit('removeAttendingEvent', event.id)
          // Reference to the user's document in Firestore
          const userRef = doc(db, 'users', auth.currentUser.uid);

          // Update the user's document by adding the event to attendingEvents array
          await updateDoc(userRef, {
            attendingEvents: arrayRemove(event.id)
          });
          return true
        }
        return false
      } catch (error) {
        console.error("Error adding event to user: ", error);
      }
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
    userIsAttending: (state) => (event) =>{
      return state.attendingEvents.includes(event.id)
    }
  }
})
