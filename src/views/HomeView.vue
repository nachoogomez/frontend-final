<script setup lang="ts">
import FromComponent from '@/components/FormComponent.vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { MoonIcon, SunIcon, LinkIcon } from '@heroicons/vue/24/solid'
import { reactive } from 'vue'

const useStore = useThemeStore()
const theme = reactive(useStore)
</script>

<template>
  <main>
    <FromComponent />
  </main>
</template>
