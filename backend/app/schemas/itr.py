from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class ITRRequestBase(BaseModel):
    income_type: str
    income_amount: Decimal
    financial_year: str

class ITRRequestCreate(ITRRequestBase):
    pass

class ITRRequestUpdate(BaseModel):
    status: Optional[str] = None
    ca_id: Optional[str] = None
    quoted_price: Optional[Decimal] = None

class ITRRequest(ITRRequestBase):
    id: str
    client_id: str
    ca_id: Optional[str]
    itr_form_type: Optional[str]
    tax_status: str
    estimated_refund: Optional[Decimal]
    estimated_tax_due: Optional[Decimal]
    status: str
    quoted_price: Optional[Decimal]
    platform_fee: Optional[Decimal]
    ca_earnings: Optional[Decimal]
    created_at: str
    assigned_at: Optional[str]
    filed_at: Optional[str]
    completed_at: Optional[str]
    updated_at: str

    class Config:
        from_attributes = True