import { useAuthStore } from "../store/auth.store";

export function useAuth() {
    const user = useAuthStore((s) => s.user)
    const isLoading = useAuthStore((s) => s.isLoading)
    const isInitialized = useAuthStore((s) => s.isInitialized)
    const login = useAuthStore((s) => s.login)
    const register = useAuthStore((s) => s.register)
    const logout = useAuthStore((s) => s.logout)

    return {
        user,
        isLoading,
        isInitialized,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    }
}
