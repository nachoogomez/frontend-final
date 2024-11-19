<script setup lang="ts">
import { reactive } from 'vue'
import { MoonIcon, SunIcon, LinkIcon } from '@heroicons/vue/24/solid'
import { useThemeStore } from '@/stores/ThemeStore'

const useStore = useThemeStore()
const theme = reactive(useStore)
</script>

<template>
  <div v-bind:class="theme.isDark ? 'dark' : ''" class="wrapper transition ease-linear">
    <div class="btn-wrapper z-10">
      <div class="toggle-btn flex items-center justify-center my-4 w-full">
        <label for="toggle" class="flex items-center justify-center cursor-pointer">
          <div class="relative">
            <input type="checkbox" id="toggle" class="sr-only" @click="theme.toggleTheme" />
            <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              class="dot absolute left-1 top-1 bg-black w-6 h-6 flex items-center justify-center rounded-full transition"
            >
              <!-- usar directiva v-if  para mostrar el icono de luna o sol -->
              <MoonIcon v-if="!theme.isDark" class="w-4 h-4 text-white" />
              <SunIcon v-if="theme.isDark" class="w-full h-full text-yellow-500 p-1" />
            </div>
          </div>
        </label>
      </div>
    </div>
    <div
      v-bind:class="theme.isDark ? 'dark' : ''"
      class="img min-h-screen flex flex-col items-center transition"
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  background: #cfcece;
}

.wrapper.dark {
  background: #1E1E2E;
}

.btn-wrapper {
  position: absolute;
  right: 16px;
}

input:checked ~ .dot {
  transform: translateX(100%);
  background-color: rgb(77, 148, 255);
}

.label-text {
  color: white;
}

.label-text.dark {
  color: black;
}

.todo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
}
</style>
