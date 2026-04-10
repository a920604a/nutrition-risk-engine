import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from 'firebase/auth'
import type { Condition } from '../engine/riskEngine'

interface AppStore {
  // 疾病條件（持久化）
  conditions: Condition[]
  setConditions: (conditions: Condition[]) => void
  toggleCondition: (condition: Condition) => void

  // 認證狀態（不持久化）
  user: User | null
  setUser: (user: User | null) => void

  // 登入 Modal
  loginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      conditions: [],
      setConditions: (conditions) => set({ conditions }),
      toggleCondition: (condition) => {
        const current = get().conditions
        const exists = current.includes(condition)
        set({
          conditions: exists
            ? current.filter((c) => c !== condition)
            : [...current, condition],
        })
      },

      user: null,
      setUser: (user) => set({ user }),

      loginModalOpen: false,
      openLoginModal: () => set({ loginModalOpen: true }),
      closeLoginModal: () => set({ loginModalOpen: false }),
    }),
    {
      name: 'nutrition-guard',
      partialize: (state) => ({ conditions: state.conditions }),
    }
  )
)
