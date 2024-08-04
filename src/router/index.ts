import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  nextTick(() => {
    document.title = (to.meta.title as string) || 'Deck of Cards'
  })
})

export default router
