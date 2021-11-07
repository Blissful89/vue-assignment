import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import router from '@/client/router'
import store from '@/client/store'
import i18n from '@/client/plugins/i18n'
import App from './App.vue'

// Note: Doing this for faster development
import 'primevue/resources/themes/vela-green/theme.css'      //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import 'primeflex/primeflex.css'                             //flex

import '@/client/styles/styles.scss'

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(i18n)
  .use(PrimeVue)
  .use(ToastService)
  .mount('#app')
