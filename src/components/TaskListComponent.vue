<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore';
import { useTaskStore } from '@/stores/TaskStore'

import type {Task} from '@/models/TaskModel'

// iconos
import { TrashIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CompletedIcon } from '@heroicons/vue/24/solid'

import SpinnerComponent from '@/components/SpinnerComponent.vue'



const themeStore = useThemeStore()
const theme = reactive(themeStore)


const taskStore = useTaskStore()
const tasks = reactive(taskStore)



</script>

<template>

    <div  class="max-w rounded overflow-y-auto shadow-2xl mt-10 p-4 transition ease-linear">
        
        <div class="px-6 py-4 flex justify-center" v-bind:class="theme.isDark? ' text-white':' text-black'" >
            <div class="font-bold text-xl mb-2">
                <span class="flex flex-row justify-start">
                    Mis Tareas
                    <SpinnerComponent v-show="tasks.loading"/>
                </span>
            </div>
          

        </div>

        <div class="px-6 py-2 ">
            <span @click="tasks.showAll" class="inline-block bg-gray-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg">Todas</span>
            <span @click="tasks.showCompleted" class="inline-block bg-green-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg">Completas</span>
            <span @click="tasks.showPending" class="inline-block bg-red-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg">Pendientes</span>
            
        </div>

    
        <div v-for="task in tasks.data" :key="task.id" class="relative group my-2 transition ease-linear rounded-md">
            <form v-on:submit.prevent>
                <div class="absolute top-3 sm:top-4 left-5 ">
                    <div @click="tasks.changeStatus(task)" class="relative">
                        <input
                        type="ckeckbox"
                        class="form-checkbox border rounded-full focus:ouline-none h-6 w-6 cursor-pointer transition ease-linear rounded-xl"
                        />
                        <CompletedIcon v-if="task.completada" class="h-100 w-100 absolute left-0 top-0 text-green-600"/>
                    </div>
                </div>
                <input
                    disabled
                    v-model="task.tarea"
                    v-bind:class="theme.isDark ? 'dark' : ''"
                    type="text"
                    class="tarea sm:text-base overflow-ellipsis w-full disabled:bg-white focus:outline-none py-4 sm:py-4.5 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear rounded-md"
                    />
                <div class="btns absolute right-0 top-0 py-2 sm:py-2.5 px-2 w-20 h-14 flex justify-around cursor-default" >

                    <button @click="tasks.removeTask(task)" class="p-1 cursor-pointer"><TrashIcon class="w-6 h-6 hover:text-red-500 "/></button> 
                </div>

              
                <span v-if="task.completada" class="badge absolute right-10 inline-block bg-green-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">Completo</span>
                <span v-if="!task.completada" class="badge absolute right-10 inline-block bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">Pendiente</span>
            </form>
        </div>
    </div>
</template>


<style scoped>


    .badge {
        top: -8px
    }
</style>