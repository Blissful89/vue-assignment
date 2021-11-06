import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import router from '@/client/router';
import App from './App.vue'

import '@/client/styles/styles.scss'

// Note: Doing this for faster development
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import 'primeflex/primeflex.css';                            //flex

const app = createApp(App)

app
  .use(PrimeVue)
  .use(router)
  .mount('#app')
