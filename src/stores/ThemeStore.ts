import { defineStore } from 'pinia'
import type { ThemeState } from '@/models/ThemeModel'

//Store to manage the theme of the application.
export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    isDark: false,
    mode: 'Light Mode',
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.mode = this.isDark ? 'Dark Mode' : 'Light Mode'
    },
  },
})
