import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface Status {
    id: string
    title: string
    color: string
    createdAt: number
}

interface StatusStore {
    statuses: Status[]
    addStatus: (status: Omit<Status, 'id' | 'createdAt'>) => void
    removeStatus: (id: string) => void
    updateStatus: (id: string, updates: Partial<Omit<Status, 'id'>>) => void
    clearStatuses: () => void
}

export const useStatusStore = create<StatusStore>()(
    persist(
        (set, get) => ({
            statuses: [],

            addStatus: (status) => set((state) => ({
                statuses: [...state.statuses, {
                    ...status,
                    id: crypto.randomUUID(),
                    createdAt: Date.now()
                }]
            })),

            removeStatus: (id) => set((state) => ({
                statuses: state.statuses.filter(status => status.id !== id)
            })),

            updateStatus: (id, updates) => set((state) => ({
                statuses: state.statuses.map(status =>
                    status.id === id ? {...status, ...updates} : status
                )
            })),

            clearStatuses: () => set({statuses: []})
        }),
        {
            name: 'status-storage',
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
