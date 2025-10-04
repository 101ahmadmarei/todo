import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface Task {
    id: string
    title: string
    description: string
    status: string
    starred: boolean
    createdAt: number
}

interface TaskStore {
    tasks: Task[]
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
    removeTask: (id: string) => void
    updateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void
    clearTasks: () => void
}

export const useTaskStore = create<TaskStore>()(
    persist(
        (set, get) => ({
            tasks: [],

            addTask: (task) => set((state) => ({
                tasks: [...state.tasks, {
                    ...task,
                    id: crypto.randomUUID(),
                    createdAt: Date.now()
                }]
            })),

            removeTask: (id) => set((state) => ({
                tasks: state.tasks.filter(task => task.id !== id)
            })),

            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map(task =>
                    task.id === id ? {...task, ...updates} : task
                )
            })),

            clearTasks: () => set({tasks: []})
        }),
        {
            name: 'task-storage',
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name)
                    if (!str) return null
                    return JSON.parse(str)
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value))
                },
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
)
