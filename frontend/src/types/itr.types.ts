export interface ITR {
  id: string;
  clientId: string;
  caId?: string;
  status: 'draft' | 'submitted' | 'processing' | 'completed' | 'rejected';
  formType: 'ITR-1' | 'ITR-2' | 'ITR-3' | 'ITR-4';
  financialYear: string;
  documents: Document[];
  investments: Investment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Investment {
  id: string;
  type: string;
  amount: number;
  description: string;
}

export interface ITRFormData {
  personalInfo: PersonalInfo;
  incomeDetails: IncomeDetails;
  deductions: Deductions;
  taxCalculation: TaxCalculation;
}