import Dexie, { Table } from 'dexie'

export interface User {
    id?: number
    email: string
    name: string
    farmDetails?: any
    syncStatus: 'pending' | 'synced'
    lastModified: Date
}

export interface CropCycle {
    id?: number
    userId: number
    cropType: string
    plantingDate: Date
    expectedHarvestDate: Date
    activities: Activity[]
    syncStatus: 'pending' | 'synced'
    lastModified: Date
}

export interface Activity {
    id?: number
    cropCycleId: number
    type: string
    description: string
    scheduledDate: Date
    completedDate?: Date
    notes?: string
    syncStatus: 'pending' | 'synced'
    lastModified: Date
}

export interface Advisory {
    id?: number
    userId: number
    title: string
    content: string
    category: string
    priority: 'low' | 'medium' | 'high'
    createdAt: Date
    syncStatus: 'pending' | 'synced'
    lastModified: Date
}

export class KrishiMitraDB extends Dexie {
    users!: Table<User>
    cropCycles!: Table<CropCycle>
    activities!: Table<Activity>
    advisories!: Table<Advisory>

    constructor() {
        super('KrishiMitraDB')
        this.version(1).stores({
            users: '++id, email, syncStatus, lastModified',
            cropCycles: '++id, userId, cropType, syncStatus, lastModified',
            activities: '++id, cropCycleId, type, scheduledDate, syncStatus, lastModified',
            advisories: '++id, userId, category, priority, createdAt, syncStatus, lastModified',
        })
    }
}

export const db = new KrishiMitraDB()

// Helper functions for offline sync
export const syncHelpers = {
    async getPendingItems<T extends { syncStatus: string }>(table: Table<T>): Promise<T[]> {
        return await table.where('syncStatus').equals('pending').toArray()
    },

    async markAsSynced<T extends { id?: number; syncStatus: string }>(
        table: Table<T>,
        id: number
    ): Promise<void> {
        await table.update(id, { syncStatus: 'synced' } as Partial<T>)
    },

    async addPendingItem<T extends { syncStatus: string; lastModified: Date }>(
        table: Table<T>,
        item: Omit<T, 'id' | 'syncStatus' | 'lastModified'>
    ): Promise<number> {
        return await table.add({
            ...item,
            syncStatus: 'pending',
            lastModified: new Date(),
        } as T)
    },
}