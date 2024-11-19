import { apiInstance } from '../api'
import type { APIResponse } from '@/models/ApiResponseModel'
import type { CreateTask } from '@/models/TaskRequestModels'
import type { TaskApiResponse } from '@/models/TaskApiResponseModel'

// Create a new task
export async function CreateTask(task: CreateTask) {
  return await apiInstance.post<APIResponse<TaskApiResponse>>('/task', task)
}

// Get all tasks
export async function GetTasks() {
  return await apiInstance.get<APIResponse<TaskApiResponse[]>>('/task')
}

// Get a single task
export async function GetTask(id: number) {
  return await apiInstance.get<APIResponse<TaskApiResponse>>(`/task/${id}`)
}

// Update a task
export async function UpdateTask(id: number, task: CreateTask) {
  return await apiInstance.put<APIResponse<TaskApiResponse>>(`/task/${id}`, task)
}

// Delete a task
export function DeleteTask(id: number) {
  return apiInstance.delete(`/task/${id}`)
}
