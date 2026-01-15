import api from './api'
import { User } from '../types'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterClientData {
  email: string
  phone: string
  password: string
  full_name: string
}

interface RegisterCAData extends RegisterClientData {
  ca_membership_number: string
  firm_name?: string
  years_of_experience: number
  languages: string[]
  base_price: number
}

interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
}

export const authService = {
  // Register Client
  registerClient: async (data: RegisterClientData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register/client', data)
    return response.data
  },

  // Register CA
  registerCA: async (data: RegisterCAData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register/ca', data)
    return response.data
  },

  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    const { access_token, refresh_token } = response.data

    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)

    return response.data
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },

  // Verify OTP
  verifyOTP: async (data: { phone: string; otp: string }): Promise<{ success: boolean }> => {
    const response = await api.post('/auth/verify-otp', data)
    return response.data
  },

  // Get Current User
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me')
    return response.data
  },

  // Refresh Token
  refreshToken: async (refreshToken: string): Promise<{ access_token: string }> => {
    const response = await api.post('/auth/refresh-token', { refresh_token: refreshToken })
    return response.data
  },
}