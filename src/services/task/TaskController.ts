import { apiInstance } from '../api'
import type { APIResponse } from '@/models/ApiResponseModel'
import type { CreateTask } from '@/models/TaskRequestModels'
import type { TaskApiResponse } from '@/models/TaskApiResponseModel'

// Create a new task
// Sends a POST request to the '/task' endpoint with task data to create a new task.
export async function CreateTask(task: CreateTask) {
  return await apiInstance.post<APIResponse<TaskApiResponse>>('/task', task)
}

// Get all tasks
// Sends a GET request to the '/task' endpoint to retrieve all tasks.
export async function GetTasks() {
  return await apiInstance.get<APIResponse<TaskApiResponse[]>>('/task')
}

// Get a single task
// Sends a GET request to the '/task/{id}' endpoint to retrieve a specific task by its ID.
export async function GetTask(id: number) {
  return await apiInstance.get<APIResponse<TaskApiResponse>>(`/task/${id}`)
}

// Update a task
// Sends a PUT request to the '/task/{id}' endpoint with task data to update a specific task by its ID.
export async function UpdateTask(id: number, task: CreateTask) {
  return await apiInstance.put<APIResponse<TaskApiResponse>>(`/task/${id}`, task)
}

// Delete a task
// Sends a DELETE request to the '/task/{id}' endpoint to delete a specific task by its ID.
export function DeleteTask(id: number) {
  return apiInstance.delete(`/task/${id}`)
}
