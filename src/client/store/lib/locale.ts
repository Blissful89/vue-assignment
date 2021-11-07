import { Module } from 'vuex'
import { LocaleState, RootState } from '@/client/store/state'

const module: Module<LocaleState, RootState> = {
  namespaced: true,
  state: {
    value: 'nl',
    options: [
      { name: 'Nederlands', code: 'nl' },
      { name: 'English', code: 'en' },
    ],
  },
  mutations: {
    SET_VALUE(state, payload) {
      state.value = payload
    },
  },
}

export default module;
