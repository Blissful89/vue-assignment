import { useI18n } from 'vue-i18n';

export default function uselocales() {
  return useI18n({ useScope: 'global' });
}
