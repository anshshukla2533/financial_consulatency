export enum UserType {
  CLIENT = 'client',
  CA = 'ca',
}

export interface User {
  id: string
  email: string
  phone: string
  user_type: UserType
  full_name: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ClientProfile {
  id: string
  user_id: string
  pan_number?: string
  aadhaar_number_encrypted?: string
  date_of_birth?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  preferred_language?: string
}

export interface CAProfile {
  id: string
  user_id: string
  ca_membership_number: string
  firm_name?: string
  years_of_experience: number
  specializations: string[]
  languages: string[]
  base_price: number
  rating: number
  total_reviews: number
  total_filings: number
  turnaround_time_hours: number
  bio?: string
  profile_image_url?: string
  is_verified: boolean
  is_available: boolean
  city?: string
  state?: string
}

export interface BankAccount {
  id: string
  client_id: string
  account_holder_name: string
  account_number_encrypted: string
  ifsc_code: string
  bank_name: string
  branch_name?: string
  is_primary: boolean
}