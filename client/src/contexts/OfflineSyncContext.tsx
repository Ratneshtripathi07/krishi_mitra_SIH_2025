'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface OfflineSyncState {
    isOnline: boolean
    pendingSync: number
    lastSyncTime: Date | null
}

interface OfflineSyncContextType {
    state: OfflineSyncState
    syncData: () => Promise<void>
    addPendingItem: () => void
}

const OfflineSyncContext = createContext<OfflineSyncContextType | null>(null)

export function OfflineSyncProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<OfflineSyncState>({
        isOnline: true,
        pendingSync: 0,
        lastSyncTime: null,
    })

    useEffect(() => {
        const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }))
        const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }))

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    const syncData = async () => {
        // Implement sync logic here
        setState(prev => ({ ...prev, pendingSync: 0, lastSyncTime: new Date() }))
    }

    const addPendingItem = () => {
        setState(prev => ({ ...prev, pendingSync: prev.pendingSync + 1 }))
    }

    return (
        <OfflineSyncContext.Provider value={{ state, syncData, addPendingItem }}>
            {children}
        </OfflineSyncContext.Provider>
    )
}

export function useOfflineSync() {
    const context = useContext(OfflineSyncContext)
    if (!context) {
        throw new Error('useOfflineSync must be used within an OfflineSyncProvider')
    }
    return context
}