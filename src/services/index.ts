import { Login, CreateUser, Logout } from './auth/AuthController'
import { CreateTask, DeleteTask, GetTask, GetTasks, UpdateTask } from './task/TaskController'

// Exports an object containing all the API methods for authentication and task management.
export const API = {
  // Auth
  CreateUser,
  Login,
  Logout,

  //Tasks
  CreateTask,
  UpdateTask,
  GetTasks,
  GetTask,
  DeleteTask,
}
