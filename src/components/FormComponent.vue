<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import {useThemeStore} from '@/stores/ThemeStore'
  import { useSesionStore } from '@/stores/AuthSesionStore'

  import type { CredentialsModel } from '@/models/CredentialsModel'
  import SpinnerComponent from '@/components/SpinnerComponent.vue'


  
  const tabs = ['Login', 'Register']
  const activeTab = ref(0)
  
    //Theme
  const useStore = useThemeStore()
  const theme = reactive(useStore)

  //Session
  const sesionStore = useSesionStore()
  const sesion = reactive(sesionStore)

  //Login
  const credentials: CredentialsModel = {
    email: '',
    password: '',
  }

  const reactiveCredentials = reactive(credentials)

  sesion.changeCrsfToken()
  
  async function loginWithCredentials() {
      const response = await sesion.login(credentials)
  }

  //Register
  const newCredentials: CredentialsModel = {
    email: '',
    password: ''
}

  const repeatPwd: string = ''
  const rptPwd = ref(repeatPwd)

  const regCredentials = reactive(newCredentials)

  async function logCredentials() {
      if(rptPwd.value === newCredentials.password) {
          await sesion.registerUser(newCredentials)
      }
      else {
          console.error('Las Contrasenas No coinciden')
      }
  }
 
</script>

<template>
    <div v-bind:class="theme.isDark? 'bg-teal-900 text-white':' bg-white text-black'" class="container mx-auto mt-16 shadow-lg rounded-lg overflow-hidden max-w-md">
      <div class="flex bg-teal-500">
        <button 
          v-for="(tab, index) in tabs" 
          :key="tab"
          @click="activeTab = index"
          :class="[
            'w-1/2 py-4 text-center focus:outline-none transition-colors duration-300',
            activeTab === index ? 'bg-teal-600' : 'hover:bg-teal-400'
          ]"
        >
          {{ tab }}
        </button>
      </div>
  
      <div v-if="activeTab === 0" class="p-8">
        <h3 class="text-2xl font-semibold text-teal-500 mb-6">Hello</h3>
        <form @submit.prevent="loginWithCredentials()">
          <div class="mb-4">
            <label for="login-email" class="block  text-sm font-semibold mb-2">Email</label>
            <input type="email" id="login-email"  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" required v-model="reactiveCredentials.email" >
          </div>
          <div class="mb-6">
            <label for="login-password" class="block  text-sm font-semibold mb-2">Password</label>
            <input type="password" id="login-password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" required v-model="reactiveCredentials.password">
          </div>
          <div class="flex flex-col items-center">
            <button type="submit" class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-300">
              <p v-show="!sesion.loading" class="my-auto p-0 text-center">Login</p>
              <SpinnerComponent v-show="sesion.loading" class="my-auto"/>
            </button>
            <a href="#" class="mt-4 text-teal-500 hover:underline">Forgotten password?</a>
            <small v-if="sesion.error===''? false:true" class="text-center text-red-500 text-sm">{{ sesion.error }}</small>
          </div>
        </form>
      </div>
  
      <div v-if="activeTab === 1" class="p-8">
        <h3 class="text-2xl font-semibold text-teal-500 mb-6">Welcome</h3>
        <form @submit.prevent="logCredentials()">
          <div class="mb-4">
            <label for="register-email" class="block text-sm font-semibold mb-2">Email</label>
            <input type="email" id="register-email"  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" required v-model="newCredentials.email" >
          </div>
          <div class="mb-4">
            <label for="register-password" class="block text-sm font-semibold mb-2">Password</label>
            <input type="password" id="register-password"  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" required v-model="newCredentials.password">
          </div>
          <div class="mb-4">
            <label for="confirm-password" class="block text-sm font-semibold mb-2">Confirm Password</label>
            <input type="password" id="confirm-password"  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" required v-model="rptPwd">
          </div>
          <div class="flex justify-center">
            <button type="submit" class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-300">
              <p v-show="!sesion.loading">Login</p>
              <SpinnerComponent v-show="sesion.loading"/>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  