import { apiInstance } from '../api'
import type { APIResponse } from '@/models/ApiResponseModel'
import type { CredentialsModel } from '@/models/CredentialsModel'
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel'

//Register a new user

export async function CreateUser(userData: CredentialsModel) {
  return await apiInstance.post<APIResponse<AuthApiResponseModel>>('auth/signup', userData)
}

//Login user

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

export async function Logout() {
  return await apiInstance.post<APIResponse<AuthApiResponseModel>>('/auth/logout')
}
