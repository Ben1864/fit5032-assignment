import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.state.isAuthenticated
        if (isAuthenticated) {
          // Redirect to home if trying to access login while already authenticated
          next({ name: 'home' })
        } else {
          next() // Proceed to login page
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/community-events',
      name: 'community-events',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: () => import('../views/AddEventView.vue')
    }
  ]
})

export default router
