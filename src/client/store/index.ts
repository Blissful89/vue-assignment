import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'
import { RootState } from './state'
import locale from './lib/locale'

export default createStore<RootState>({
  modules: {
    locale,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ['locale.value'],
    }),
  ],
})
