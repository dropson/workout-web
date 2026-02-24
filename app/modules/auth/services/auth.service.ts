import { apiClient } from "@/infrastructure/api/client"
import Cookies from 'js-cookie'
import { LoginDto, RegisterDto, User } from "../index"
import { AUTH_ENDPOINTS } from "../config/api.config"

class AuthService {
  async register(data: RegisterDto) {
    await this.getCsrfCookie();
    const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, data)

    if (response.data.data.token) {
      this.setAccessToken(response.data.data.token)
    }

    return response.data
  }

  async getCsrfCookie(): Promise<void> {
    await apiClient.get('/sanctum/csrf-cookie');
  }

  async login(credentials: LoginDto) {
    await this.getCsrfCookie();
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials)
    this.setAccessToken(response.data.data.token)
    return response.data.data
  }

  async logout() {
    try {

        await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
        console.error("Logout error:", error);
    } finally {
        Cookies.remove('accessToken');
        const cookieOptions = { domain: '.workout.test', path: '/' };
        Cookies.remove('XSRF-TOKEN', cookieOptions);
        Cookies.remove('laravel_session', cookieOptions);


        if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
        }
    }
}

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>(AUTH_ENDPOINTS.PROFILE)
    return response.data
  }

  getAccessToken(): string | undefined {
    return Cookies.get('accessToken')
  }

  private setAccessToken(token: string): void {
    Cookies.set('accessToken', token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
  }

//   getAccessToken(): string | null {
//     if (typeof window === 'undefined') return null
//     return localStorage.getItem('accessToken')
//   }

//   private setAccessToken(token: string) {
//     localStorage.setItem('accessToken', token)
//   }

//   private removeAccessToken() {
//     localStorage.removeItem('accessToken')
//   }
}

export const authService = new AuthService()
