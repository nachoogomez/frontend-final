import { defineStore } from 'pinia'
import type { Task, TaskState } from '@/models/TaskModel'

interface TaskFilterState extends TaskState {
  completed: Task[]
  pending: Task[]
  all: Task[]
}

export const useTaskStore = defineStore({
  id: 'task',
  state: (): TaskFilterState => ({
    loading: false,
    data: [],
    all: [],
    completed: [],
    pending: [],
  }),
  actions: {
    // Add task
    addTask(task: Task) {
      let tId: number = this.data.length
      let newTask: Task = { ...task, id: tId }
      this.data.push(newTask)
      this.all.push(newTask)
      if (newTask.completada) {
        this.completed.push(newTask)
      } else {
        this.pending.push(newTask)
      }
    },
    // Remove task
    removeTask(task: Task) {
      this.data = this.data.filter((item) => item.id !== task.id)
      this.completed = this.completed.filter((item) => item.id !== task.id)
      this.pending = this.pending.filter((item) => item.id !== task.id)
      this.all = this.data.slice()
    },
    // Change status
    changeStatus(task: Task) {
      const index = this.data.findIndex((item) => item.id === task.id)
      this.data[index].completada = !this.data[index].completada
      if (this.data[index].completada) {
        this.completed.push(this.data[index])
        this.pending = this.pending.filter((item) => item.id !== this.data[index].id)
      } else {
        this.completed = this.completed.filter((item) => item.id !== this.data[index].id)
        this.pending.push(this.data[index])
      }
    },
    // Filter tasks
    showCompleted() {
      this.data = this.completed.slice()
    },
    showPending() {
      this.data = this.pending.slice()
    },
    showAll() {
      this.data = this.all.slice()
    },
  },
})
