import { createI18n } from 'vue-i18n'
import nl from '@/client/locales/nl.json'

export default createI18n({
  locale: 'nl',
  fallbackLocale: 'en', // set fallback locale
  messages: { nl: nl.messages },
})
