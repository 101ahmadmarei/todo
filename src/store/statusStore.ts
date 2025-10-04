import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface Status {
    id: number
    title: string
    color: string
}

interface StatusStore {
    statuses: Status[]
    addStatus: (status: Omit<Status, 'id' | 'createdAt'>) => void
    removeStatus: (id: number) => void
    clearStatuses: () => void
}

export const useStatusStore = create<StatusStore>()(
    persist(
        (set) => ({
            statuses: [],

            addStatus: (status) => set((state) => ({
                statuses: [...state.statuses, {
                    ...status,
                    id: Date.now()
                }]
            })),

            removeStatus: (id) => set((state) => ({
                statuses: state.statuses.filter(status => status.id !== id)
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
