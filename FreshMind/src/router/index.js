import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.state.isAuthenticated
        if (isAuthenticated) {
          // Redirect to home if trying to access login while already authenticated
          next({ name: 'Home' })
        } else {
          next() // Proceed to login page
        }
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/community-events',
      name: 'CommunityEvents',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/community-events/:id', // Dynamic route with ID parameter
      name: 'EventInfo',
      component: () => import('../views/EventInfoView.vue'),
      props: true // Pass route parameters as props to the component
    },
    {
      path: '/add-event',
      name: 'Add-event',
      component: () => import('../views/AddEventView.vue')
    }
  ]
})

export default router
