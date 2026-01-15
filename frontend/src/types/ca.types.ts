export interface CAListItem {
  id: string
  full_name: string
  firm_name?: string
  rating: number
  total_reviews: number
  total_filings: number
  base_price: number
  years_of_experience: number
  languages: string[]
  turnaround_time_hours: number
  specializations: string[]
  is_available: boolean
  match_score?: number
  city?: string
  state?: string
}

export interface CAFilters {
  income_type?: IncomeType
  min_rating?: number
  max_price?: number
  language?: string
  city?: string
  sort_by?: 'rating' | 'price' | 'experience' | 'turnaround_time'
}

export interface CAApplication {
  id: string
  itr_request_id: string
  ca_id: string
  quoted_price: number
  estimated_completion_hours: number
  message?: string
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  created_at: string
}

export interface CADashboardStats {
  pending_requests: number
  active_cases: number
  completed_this_month: number
  total_earnings: number
  pending_earnings: number
  avg_rating: number
}