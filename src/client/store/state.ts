export interface LocaleState {
  value: string
  options: { name: string; code: string }[]
}

export interface RootState {
  locale: LocaleState
}
