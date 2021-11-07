import { createI18n } from 'vue-i18n'
import nl from '@/client/locales/nl.json'
import en from '@/client/locales/en.json'

export default createI18n({
  fallbackLocale: 'en', // set fallback locale
  messages: { nl: nl.messages, en: en.messages },
})
