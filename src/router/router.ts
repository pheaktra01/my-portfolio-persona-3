import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Pages views
import HomeView from '../views/HomeView.vue'
import SkillsView from '../views/SkillView.vue'
import ProjectsView from '../views/ProjectView.vue'
import StackView from '../views/StackView.vue'
import ProfileView from '../views/ProfileView.vue'
import ExperienceView from '../views/ExperienceView.vue'
import TimelineView from '../views/TimelineView.vue'
import SocialLinksView from '../views/SocialView.vue'
import CalendarView from '../views/CalendarView.vue'
import ResumeView from '../views/ResumeView.vue'
import JourneyView from '../views/JourneyView.vue'

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
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
  },
  {
    path: '/stack',
    name: 'stack',
    component: StackView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/experience',
    name: 'experience',
    component: ExperienceView,
  },
  {
    path: '/journey',
    name: 'journey',
    component: JourneyView,
  },
  {
    path: '/social-links',
    name: 'social-links',
    component: SocialLinksView,
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
  },
  {
    path: '/resume',
    name: 'resume',
    component: ResumeView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router