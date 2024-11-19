// Define the structure of the response of the task API

export interface TaskApiResponse {
  statusCode?: number
  message?: string | [string]
  error?: string
  id?: number
  createdAt?: string
  updatedAt?: string
  title?: string
  description?: string
  userId?: string
}
