import { apiInstance } from '../api'
import type { APIResponse } from '@/models/ApiResponseModel'
import type { CredentialsModel } from '@/models/CredentialsModel'
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel'

//Register a new user
// Sends a POST request to the 'auth/signup' endpoint with user credentials to create a new user.
export async function CreateUser(userData: CredentialsModel) {
  return await apiInstance.post<APIResponse<AuthApiResponseModel>>('auth/signup', userData)
}

//Login user
//Sends a POST request to the '/auth/login' endpoint with user credentials to log in a user.
//Includes credentials in the request and returns the server response.
export async function Login(credentials: CredentialsModel) {
  const response = await apiInstance.post<APIResponse<AuthApiResponseModel>>(
    '/auth/login',
    credentials,
    {
      withCredentials: true,
    },
  )
  const setCookie = response.headers['set-cookie']
  return response
}

//Logout user
// Sends a POST request to the '/auth/logout' endpoint to log out the current user.
export async function Logout() {
  return await apiInstance.post<APIResponse<AuthApiResponseModel>>('/auth/logout')
}
