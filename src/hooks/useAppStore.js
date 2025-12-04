/** @format */

import { AES, enc } from 'crypto-js'
import localforage from 'localforage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      name: '',
      setName: (name) => set({ name }),
      database: null,
      setDatabase: (database) => {
        const { password } = get()
        if (database !== null && password !== '') {
          const data = JSON.parse(
            AES.decrypt(database, password).toString(enc.Utf8),
          )
          return set({ database, data })
        }
        return set({ database })
      },
      password: '',
      setPassword: (password) => {
        const { database } = get()
        if (database !== null && password !== '') {
          const data = JSON.parse(
            AES.decrypt(database, password).toString(enc.Utf8),
          )
          return set({ password, data })
        }
        return set({ password })
      },
      data: null,
      setData: (data) => {
        if (data !== null) {
          const { password } = get()
          const database = AES.encrypt(
            JSON.stringify(data),
            password,
          ).toString()
          return set({ data, database })
        }
        return set({ data })
      },
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => {
        return set({ hasHydrated })
      },
    }),
    {
      name: 'database',
      storage: createJSONStorage(() => localforage),
      partialize: ({ name, database, password }) => ({
        name,
        database,
        password,
      }),
      onRehydrateStorage: () => {
        return (state) => {
          state.setDatabase(state.database)
          state.setHasHydrated(true)
        }
      },
    },
  ),
)

export default useAppStore
