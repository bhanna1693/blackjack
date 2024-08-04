import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/blackjack',
    name: 'Blackjack',
    component: () => import('../views/BlackjackView.vue'),
    meta: {
      title: 'Blackjack'
    }
  }
]
