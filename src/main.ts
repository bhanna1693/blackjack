import './assets/styles.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.errorHandler = (err, instance, info) => {
  console.error('Error: ', err, { instance, info })
}
app.mount('#app')
