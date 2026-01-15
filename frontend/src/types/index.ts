export * from './user.types'
export * from './itr.types'
export * from './ca.types'
export * from './payment.types'
export * from './chat.types'

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  page_size: number
}