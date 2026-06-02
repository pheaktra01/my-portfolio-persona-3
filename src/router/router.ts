import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Pages
import HomeView from '../views/HomeView.vue'
import SkillsView from '../views/SkillView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/skills',
    name: 'skills',
    component: SkillsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router