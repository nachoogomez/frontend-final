<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useTaskStore } from '@/stores/TaskStore'
import type { Task } from '@/models/TaskModel'

// icons
import { XMarkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'  


const themeStore = useThemeStore()
const taskStore = useTaskStore()

const newTask = reactive<Task>({
  id: 0,
  tarea: '',
  completada: false
})

//Complete or uncomplete task
function toggleComplete() {
  newTask.completada = !newTask.completada
}

//Save task
function saveTask() {
  if (newTask.tarea.trim()) {
    taskStore.addTask({ ...newTask, id: Date.now() })
    newTask.tarea = ''
    newTask.completada = false
  }
}

//Clear task
function clearTask() {
  newTask.tarea = ''
  newTask.completada = false
}
</script>

<template>
  <div class="wrapper relative group border border-gray-300 rounded-lg overflow-hidden">
    <div class="absolute top-3 sm:top-4 left-5">
      <div class="relative">
        <!--Inputs for add a completed task -->
        <input
          type="checkbox"
          :checked="newTask.completada"
          @change="toggleComplete"
          class="form-checkbox border focus:outline-none h-6 w-6 cursor-pointer transition ease-linear "
        />
      
        <CheckCircleIcon
          v-if="newTask.completada"
          @click="toggleComplete"
          class="h-6 w-6 absolute left-0 top-0 text-green-500 cursor-pointer"
        />
      </div>
    </div>
    <!--Form for add a new task -->
    <form @submit.prevent="saveTask">
      <input
        v-model="newTask.tarea"
        type="text"
        placeholder="Escribe una nueva tarea"
        :class="[
          'sm:text-base overflow-ellipsis w-full focus:outline-none py-4 sm:py-4.5 pr-20 pl-14 sm:pl-16 cursor-text transition ease-linear',
          themeStore.isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        ]"
      />

      <div 
        :class="[
          'btns absolute right-0 top-0 h-full flex items-center px-2 transition ease-linear ',
          themeStore.isDark ? 'bg-gray-700' : 'bg-gray-100'
        ]"
      >
        <button type="submit" class="p-1 cursor-pointer" title="Guardar tarea">
          <PlusCircleIcon class="w-6 h-6 text-green-600 hover:text-green-700"/>
        </button>
        <button type="button" @click="clearTask" class="p-1 cursor-pointer" title="Limpiar">
          <XMarkIcon class="w-6 h-6 text-red-500 hover:text-red-600"/>
        </button> 
      </div>
    </form>
  </div>
</template>

<style scoped>
.btns button:first-child {
  border-right: 1px solid currentColor;
}
</style>