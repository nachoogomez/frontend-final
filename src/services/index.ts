import { Login, CreateUser, Logout } from './auth/AuthController'
import { CreateTask, DeleteTask, GetTask, GetTasks, UpdateTask } from './task/TaskController'

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
