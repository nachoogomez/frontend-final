<script setup lang="ts">
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useSesionStore } from '@/stores/AuthSesionStore'

import type { CredentialModel } from '@/models/CredentialModel'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

//Theme
const useStore = useThemeStore()
const theme = reactive(useStore)

//Session
const sesionStore = useSesionStore()
const sesion = reactive(sesionStore)

const credentials: CredentialModel = {
  username: '',
  password: '',
}

const reactiveCredentials = reactive(credentials)

sesion.changeCrsfToken()
async function loginWithCredentials() {
    const response = await sesion.login(credentials)
}
</script>

<template>
  <div
    v-bind:class="theme.isDark ? 'bg-slate-800 text-white' : 'bg-white text-black'"
    class="w-full max-w-sm p-6 m-auto mx-auto rounded-lg shadow-md my-8 flex flex-col items-center"
  >
    <form class="mt-6" @submit.prevent="loginWithCredentials()">
      <div>
        <label for="username" class="block text-sm">Username</label>
        <input
          type="text"
          class="block w-full px-4 py-2 mt-2 bg-white border rounded-lg focus:border-blue-400 -blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          v-model="reactiveCredentials.email" 
        />
      </div>

      <div class="mt-4">
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm">Password</label>
          <a href="#" class="text-xs d hover:underline font-semibold">Forget Password?</a>
        </div>

        <input
          type="password"
          class="block w-full px-4 py-2 mt-2 bg-white border rounded-lg focus:border-blue-400 -blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
           v-model="reactiveCredentials.password"
        />
      </div>

      <div class="mt-6">
        <button
          class="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-600 rounded-lg hover:bg-slate-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
        >
        <p v-show="!sesion.loading" class="my-auto p-0 text-center">Login</p>
        <SpinnerComponent v-show="sesion.loading" class="my-auto"/>
        </button>
      </div>
    </form>

    <p class="mt-8 text-xs font-light text-center font-bold">
      Don't have an account?
      <a href="#" class="font-medium hover:underline font-bold">Create One</a>
    </p>
    <small v-if="sesion.error===''? false:true" class="text-center text-red-500 text-sm">{{ sesion.error }}</small>
  </div>
</template>
