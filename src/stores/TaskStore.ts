import { defineStore } from 'pinia'
import type { Task, TaskState } from '@/models/TaskModel'

interface TaskFilterState extends TaskState {
  completed: Task[]
  pending: Task[]
  all: Task[]
}

export const useTaskStore = defineStore({
  id: 'task',
  // Initial state
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
      // Get the last id
      let tId: number = this.data.length
      // Create a new task
      let newTask: Task = { ...task, id: tId }
      this.data.push(newTask)
      this.all.push(newTask)
      // Check if the task is completed
      if (newTask.completada) {
        this.completed.push(newTask)
      } else {
        // If not completed, add to pending
        this.pending.push(newTask)
      }
    },
    // Remove task
    removeTask(task: Task) {
      // Remove the task from the data array
      this.data = this.data.filter((item) => item.id !== task.id)
      this.completed = this.completed.filter((item) => item.id !== task.id)
      this.pending = this.pending.filter((item) => item.id !== task.id)
      this.all = this.data.slice()
    },
    // Change status
    changeStatus(task: Task) {
      // Find the task in the data array and change the status
      const index = this.data.findIndex((item) => item.id === task.id)
      this.data[index].completada = !this.data[index].completada
      // Check if the task is completed or not
      if (this.data[index].completada) {
        this.completed.push(this.data[index])
        this.pending = this.pending.filter((item) => item.id !== this.data[index].id)
      } else {
        // If not completed, add to pending
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
