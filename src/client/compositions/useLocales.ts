import { watch } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { RootState } from '@/client/store/state'

export default function uselocales() {
  const store = useStore<RootState>()
  const i18n = useI18n({ useScope: 'global' })
  watch(
    () => store.state.locale.value,
    (e) => (i18n.locale.value = e),
    { immediate: true },
  )
  return i18n
}
