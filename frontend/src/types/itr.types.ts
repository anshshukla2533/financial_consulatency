export enum IncomeType {
  SALARY = 'salary',
  FREELANCE = 'freelance',
  BUSINESS = 'business',
  STUDENT = 'student',
  FARMER = 'farmer',
  OTHER = 'other',
}

export enum ITRStatus {
  DRAFT = 'draft',
  CA_SEARCH = 'ca_search',
  CA_ASSIGNED = 'ca_assigned',
  DOCUMENTS_PENDING = 'documents_pending',
  IN_PROGRESS = 'in_progress',
  FILED = 'filed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TaxStatus {
  REFUND = 'refund',
  DUE = 'due',
  NIL = 'nil',
}

export enum InvestmentType {
  LIC = 'lic',
  PPF = 'ppf',
  FD = 'fd',
  ELSS = 'elss',
  NPS = 'nps',
  HOME_LOAN = 'home_loan',
  EDUCATION_LOAN = 'education_loan',
  OTHER = 'other',
}

export interface Investment {
  id?: string
  itr_request_id?: string
  investment_type: InvestmentType
  investment_name?: string
  amount: number
  policy_number?: string
}

export interface ITRRequest {
  id: string
  client_id: string
  ca_id?: string
  income_type: IncomeType
  income_amount: number
  financial_year: string
  itr_form_type?: string
  tax_status: TaxStatus
  estimated_refund?: number
  estimated_tax_due?: number
  status: ITRStatus
  quoted_price?: number
  platform_fee?: number
  ca_earnings?: number
  created_at: string
  assigned_at?: string
  filed_at?: string
  completed_at?: string
  updated_at: string
}

export interface ITRFormData {
  income_type: IncomeType
  income_amount: number
  financial_year: string
  investments: Investment[]
}