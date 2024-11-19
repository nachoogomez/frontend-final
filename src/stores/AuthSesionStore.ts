import { defineStore } from 'pinia'
import router from '@/router'

//Import models
import type { SesionStateModel } from '@/models/SesionStateModel'
import type { CredentialsModel } from '@/models/CredentialsModel'

//import methods DB
import { API } from '@/services'
import { apiInstance } from '@/services/api'

//Define store

/**
 * Store for managing user session.
 */
export const useSesionStore = defineStore({
  id: 'sesion',
  state: (): SesionStateModel => ({
    loading: false,
    data: {
      user: undefined,
      crsfToken: undefined,
      jwtExpires: undefined,
    },
    error: '',
  }),
  actions: {
    /**
     * Updates the CSRF token from the API instance headers.
     */
    changeCrsfToken() {
      const headers = apiInstance.defaults.headers 
      this.data!.crsfToken = headers["csrf-token"]?.toString() 
      console.info('[Sesion Store 🔑] CRSF Token Updated') 
    },

    /**
     * Registers a new user with the provided credentials.
     * @param userData - The credentials of the user to register.
     */
    async registerUser(userData: CredentialsModel) {
      this.loading = true
      try {
        const response = await API.CreateUser(userData)

        if (response.status === 201) {
          this.data!.user = userData
          console.info('[Sesion Store] Usuario Creado, codigo de respuesta: ' + response.status)
          this.login(userData)
          this.loading = false
        }
      } catch (e) {
        console.error('[Sesion Store] Error al registrar usuario', e)
        this.error = e!.toString()
      }
    },

    /**
     * Logs in a user with the provided credentials.
     * @param userData - The credentials of the user to log in.
     */
    async login(userData: CredentialsModel) {
      this.loading = true
      try {
        const response = await API.Login(userData)
        if (response.status === 200) {
          this.data!.user = userData
          const currentEpochTime = Math.floor(Date.now() / 1000)
          this.data!.jwtExpires = currentEpochTime + 3 * 60 // 3 minutes
          console.info('[Sesion Store] User logged in, response code: ' + response.status)
          console.info('[Sesion Store] Routing to Tasks')
          this.loading = false
          router.push('/tasks')
        }
      } catch (e) {
        this.loading = false
        console.error('[Sesion Store] Error logging in user', e)
        this.error = e!.toString()
      }
    },

    /**
     * Logs out the current user.
     */
    async logout() {
      this.loading = true
      this.data!.user = undefined
      this.data!.jwtExpires = undefined
      try {
        const response = await API.Logout()
        if(response.status === 200) {
          console.info('[AUTH-API 🔑] User Logged Out, response code: ' + response.status)
          this.loading = false
          router.push('/')
        }
      } catch (e) {
        console.error('[AUTH-API 🔑] Error logging out user', e)
        this.loading = false
        this.error = e!.toString()
      }
    },

    /**
     * Renews the JWT token every 3 minutes.
     */
    renewToken() {
      console.info('[Sesion Store 🔑] Renewing token in 3 min')
      setTimeout(async () => {
        try {
          const response = await API.Login({email: this.data!.user!.email, password: this.data!.user!.password})
          if(response.status === 200) {
            const currentEpochTime = Math.floor(Date.now() / 1000) 
            this.data!.jwtExpires = currentEpochTime + 3 * 60 // 3 minutes
            console.info('[AUTH-API 🔑] Token Renewed')
          }
        } catch (e) {
          console.error('[AUTH-API 🔑] Error renewing token', e)
          this.error = e!.toString()
        }
      }, 3 * 60 * 1000)

      setTimeout(() => this.renewToken(), 3 * 60 * 1000)
    },
  },
})

