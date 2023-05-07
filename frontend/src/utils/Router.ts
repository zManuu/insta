import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/', component: () => import('../views/Home.vue') },
      { path: '/search', component: () => import('../views/Search.vue') },
      { path: '/login', component: () => import('../views/Login.vue') },
      { path: '/user/:userName', component: () => import('../views/Profile.vue') },
  ]
})