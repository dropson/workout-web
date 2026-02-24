export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    emailVerified: boolean
}

export interface LoginDto {
    email: string
    password: string
}
export interface RegisterDto {
    email: string
    first_name: string
    last_name: string
    password: string
    password_confirmation: string
}

export interface AuthContextValue {
    user: User | null
    isLoading: boolean
    isInitialized: boolean
    initialize: () => Promise<void>
    login: (cretentials: LoginDto) => Promise<void>
    register: (data: RegisterDto) => Promise<void>
    logout: () => Promise<void>
}
