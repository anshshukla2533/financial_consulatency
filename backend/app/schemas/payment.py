from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class PaymentBase(BaseModel):
    amount: Decimal
    payment_method: str

class PaymentCreate(PaymentBase):
    itr_request_id: str
    client_id: str
    ca_id: Optional[str] = None

class PaymentUpdate(BaseModel):
    payment_status: Optional[str] = None
    transaction_id: Optional[str] = None

class Payment(PaymentBase):
    id: str
    itr_request_id: str
    client_id: str
    ca_id: Optional[str]
    platform_fee: Decimal
    ca_earnings: Decimal
    payment_gateway: Optional[str]
    transaction_id: Optional[str]
    payment_status: str
    paid_at: Optional[str]
    refunded_at: Optional[str]
    created_at: str

    class Config:
        from_attributes = True