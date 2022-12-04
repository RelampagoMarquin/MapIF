import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

/* importando rotas */
import router from './router'

/* Pinia */
import { createPinia } from 'pinia'

/* framework vuetify */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(vuetify).mount('#app')
