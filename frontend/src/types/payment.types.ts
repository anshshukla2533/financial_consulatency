export enum PaymentMethod {
  UPI = 'upi',
  CARD = 'card',
  NETBANKING = 'netbanking',
  WALLET = 'wallet',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface Payment {
  id: string
  itr_request_id: string
  client_id: string
  ca_id?: string
  amount: number
  platform_fee: number
  ca_earnings: number
  payment_method: PaymentMethod
  payment_gateway?: string
  transaction_id?: string
  payment_status: PaymentStatus
  paid_at?: string
  refunded_at?: string
  created_at: string
}

export interface PaymentOrder {
  order_id: string
  amount: number
  currency: string
  payment_gateway: string
}