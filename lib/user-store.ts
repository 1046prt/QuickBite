import { create } from "zustand"

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  signup: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => set({ user, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),

  signup: (user) => set({ user, isAuthenticated: true }),
}))