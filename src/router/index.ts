import { createRouter, createWebHistory } from 'vue-router'
import AuthenticateView from '../views/AuthenticateView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import stytch from '../stytch'

export const ROUTES = {
  LOGIN: 'login',
  AUTHENTICATE: 'authenticate',
  DASHBOARD: 'dashboard'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.LOGIN,
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/authenticate',
      name: ROUTES.AUTHENTICATE,
      component: AuthenticateView,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: ROUTES.DASHBOARD,
      component: DashboardView,
      meta: { requiresAuth: true }
    }
  ]
})

// When navigating to authenticated routes check for a session
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !stytch.session.getSync()) {
    return {
      name: ROUTES.LOGIN
    }
  }
})

export default router
