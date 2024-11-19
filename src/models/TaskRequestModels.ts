//Define the structure of the request of the task API

type TaskCompl = 'Completada' | 'Incompleta'

export interface CreateTask {
  title: string
  description: TaskCompl
}
