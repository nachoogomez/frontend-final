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
  //initial state
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
    //Updates the CSRF 
    changeCrsfToken() {
      //Get the CSRF token from the API instance headers.
      const headers = apiInstance.defaults.headers 
      //Update the CSRF token in the store and log the update.
      this.data!.crsfToken = headers["csrf-token"]?.toString() 
      console.info('[Sesion Store 🔑] CRSF Token Updated') 
    },

    /**
     * Registers a new user with the provided credentials.
     * @param userData - The credentials of the user to register.
     */

    async registerUser(userData: CredentialsModel) {
      //Set loading to true
      this.loading = true
      //Try/Catch
      try {
        //Call the CreateUser method from the API service which contains the Auth Controllers to create a new user.
        const response = await API.CreateUser(userData)

        //If the response status is 201, the user was created successfully.
        if (response.status === 201) {
          //Set the user data in the store and log the status.
          this.data!.user = userData
          console.info('[Sesion Store] Usuario Creado, codigo de respuesta: ' + response.status)
          //Call the login method to log in the user.
          this.login(userData)
          //Set loading to false
          this.loading = false
        }
      } catch (e) {
        //If there is an error, log the error and set it in the store.
        console.error('[Sesion Store] Error al registrar usuario', e)
        this.error = e!.toString()
      }
    },

    /**
     * Logs in a user with the provided credentials.
     * @param userData - The credentials of the user to log in.
     */
    async login(userData: CredentialsModel) {
      //Set loading to true
      this.loading = true
      //Try/Catch
      try {
        //Call the Login method from the API service which contains the Auth Controllers to log in a user.
        const response = await API.Login(userData)
        //If the response status is 200, the user was logged in successfully.
        if (response.status === 200) {
          //Set the user data in the store, set the JWT expiration time to 3 minutes and log the status.
          this.data!.user = userData
          //Get the current epoch time in seconds.
          const currentEpochTime = Math.floor(Date.now() / 1000)
          this.data!.jwtExpires = currentEpochTime + 3 * 60 // 3 minutes
          //Log the status, set the loading to false and route to the tasks page.
          console.info('[Sesion Store] User logged in, response code: ' + response.status)
          console.info('[Sesion Store] Routing to Tasks')
          this.loading = false
          router.push('/tasks')
        }
      } catch (e) {
        //If there is an error, log the error and set it in the store.
        this.loading = false
        console.error('[Sesion Store] Error logging in user', e)
        this.error = e!.toString()
      }
    },

    // Logs out the current user.
  
    async logout() {
      //Set loading to true, set the user data to undefined and the JWT expiration time to undefined.
      this.loading = true
      this.data!.user = undefined
      this.data!.jwtExpires = undefined
      //Try/Catch
      try {
        //Call the Logout method from the API service which contains the Auth Controllers to log out a user.
        const response = await API.Logout()
        //If the response status is 200, the user was logged out successfully.
        if(response.status === 200) {
          console.info('[AUTH-API 🔑] User Logged Out, response code: ' + response.status)
          this.loading = false
          router.push('/')
        }
      } catch (e) {
        //If there is an error, log the error and set it in the store.
        console.error('[AUTH-API 🔑] Error logging out user', e)
        this.loading = false
        this.error = e!.toString()
      }
    },

    //Renews the JWT token every 3 minutes.
  
    renewToken() {
      //Log the token renewal.
      console.info('[Sesion Store 🔑] Renewing token in 3 min')
      //Set a timeout to renew the token every 3 minutes.
      setTimeout(async () => {
        try {
         //Call the Login method from the API service. Check if the user data is not undefined.
          const response = await API.Login({email: this.data!.user!.email, password: this.data!.user!.password})
          //If the response status is 200, the token was renewed successfully.
          if(response.status === 200) {
            const currentEpochTime = Math.floor(Date.now() / 1000) 
            this.data!.jwtExpires = currentEpochTime + 3 * 60 // 3 minutes
            console.info('[AUTH-API 🔑] Token Renewed')
          }
        } catch (e) {
          //If there is an error, log the error and set it in the store.
          console.error('[AUTH-API 🔑] Error renewing token', e)
          this.error = e!.toString()
        }
      }, 3 * 60 * 1000)
      //Set a timeout to renew the token every 3 minutes.
      setTimeout(() => this.renewToken(), 3 * 60 * 1000)
    },
  },
})

