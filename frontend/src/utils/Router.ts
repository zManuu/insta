import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/search', component: () => import('../views/Search.vue') },
    { path: '/login', component: () => import('../views/Login.vue') },
    { path: '/user/:userName', component: () => import('../views/Profile.vue') },
    { path: '/post/:postID', component: () => import('../views/Post.vue') },
    { path: '/inbox', component: () => import('../views/Inbox.vue') },
    { path: '/chat/:userName', component: () => import('../views/Chat.vue') },
    { path: '/upload', component: () => import('../views/Upload.vue') },
  ]
})