import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'

import '@/client/styles/styles.scss'

// Note: Doing this for faster development
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import 'primeflex/primeflex.css';                            //flex

const app = createApp(App)

app.use(PrimeVue).mount('#app')
