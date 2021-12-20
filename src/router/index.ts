import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/loading' },
    { path: '/loading', component: () => import('./Loading.vue') },
    { path: '/first-run', component: () => import('./FirstRun.vue') },
    { path: '/dashboard', component: () => import('./Dashboard.vue') },
    { path: '/preferences', component: () => import('./Preferences.vue') },
  ]
})