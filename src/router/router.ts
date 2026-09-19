import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Pages views (Lazy-loaded for optimal initial bundle and smooth transitions)
import HomeView from '../views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('../views/ExperienceView.vue'),
  },
  {
    path: '/journey',
    name: 'journey',
    component: () => import('../views/JourneyView.vue'),
  },
  {
    path: '/social-links',
    name: 'social-links',
    component: () => import('../views/SocialView.vue'),
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('../views/ResumeView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router