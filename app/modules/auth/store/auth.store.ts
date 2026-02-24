import { create } from "zustand"
import toast from "react-hot-toast"
import { authService } from "../services/auth.service"
import { AuthContextValue } from "../index"

export const useAuthStore = create<AuthContextValue>((set) => ({
    user: null,
    isLoading: false,
    isInitialized: false,
    initialize: async () => {
        try {
            const token = authService.getAccessToken()

            if (!token) {
                set({ user: null })
                return
            }

            const profile = await authService.getProfile()
            set({ user: profile.data })
        } catch {
            set({ user: null })
        } finally {
            set({ isInitialized: true })
        }
    },

    login: async (credentials) => {

        try {
            set({ isLoading: true })
            const response = await authService.login(credentials)
            set({ user: response.user })
            toast.success('Welcome back')
            return response

        } catch (error: any) {

            toast.error(error.response?.data?.message || 'Login failed')
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    register: async (data) => {
        try {
            set({ isLoading: true })
            const response = await authService.register(data)
            set({ user: response.data.user })

            toast.success('Account created')
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed')
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    logout: async () => {
        await authService.logout()
        set({ user: null })
    },
}))
