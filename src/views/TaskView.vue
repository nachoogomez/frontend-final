<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import TaskListComponent from '@/components/TaskListComponent.vue'
import { useThemeStore } from '@/stores/ThemeStore';
import {reactive } from 'vue'

const themeStore = useThemeStore()
const theme = reactive(themeStore)

</script>

<template>
  <div class="min-h-screen">
    <div>
      <p
        class="text-3xl lg:text-4xl text-center font-bold tracking-widest pt-10 sm:pt-16 lg:pt-24 pb-6 lg:pb-10"
       v-bind:class="theme.isDark? ' text-white':' text-black'"
      >
        Tareas
      </p>
    </div>
    <InputComponent />
    <TaskListComponent />
  </div>
  
</template>