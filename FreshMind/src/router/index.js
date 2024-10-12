import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/store'
import AttendingEvents from '@/views/AttendingEventsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
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
      path: '/community-events',
      name: 'CommunityEvents',
      component: () => import('../views/CommunityEventsView.vue')
    },
    {
      path: '/community-events/:id', // Dynamic route with ID parameter
      name: 'EventInfo',
      component: () => import('../views/EventInfoView.vue'),
      props: true // Pass route parameters as props to the component
    },
    {
      path: '/add-event',
      name: 'AddEvent',
      component: () => import('../views/AddEventView.vue')
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: () => import('../views/ReviewsView.vue')
    },
    {
      path: '/attending-events',
      name: 'AttendingEvents',
      component: () => import('../views/AttendingEventsView.vue')
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: () => import('../views/ContactUsView.vue')
    },
    {
      path: '/find-support',
      name: 'FindSupport',
      component: () => import('../views/FindSupportView.vue')
    }
  ]
})

export default router
