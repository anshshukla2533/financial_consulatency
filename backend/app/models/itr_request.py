from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
import enum

from app.database import Base

class IncomeType(str, enum.Enum):
    salary = "salary"
    freelance = "freelance"
    business = "business"
    student = "student"
    farmer = "farmer"
    other = "other"

class TaxStatus(str, enum.Enum):
    refund = "refund"
    due = "due"
    nil = "nil"

class RequestStatus(str, enum.Enum):
    draft = "draft"
    ca_search = "ca_search"
    ca_assigned = "ca_assigned"
    documents_pending = "documents_pending"
    in_progress = "in_progress"
    filed = "filed"
    completed = "completed"
    cancelled = "cancelled"

class ITRRequest(Base):
    __tablename__ = "itr_requests"

    id = Column(String, primary_key=True, index=True)
    client_id = Column(String, ForeignKey("users.id"), nullable=False)
    ca_id = Column(String, ForeignKey("users.id"))

    income_type = Column(Enum(IncomeType), nullable=False)
    income_amount = Column(Numeric(15, 2), nullable=False)
    financial_year = Column(String, nullable=False)

    itr_form_type = Column(String)
    tax_status = Column(Enum(TaxStatus), default=TaxStatus.nil)
    estimated_refund = Column(Numeric(15, 2))
    estimated_tax_due = Column(Numeric(15, 2))

    status = Column(Enum(RequestStatus), default=RequestStatus.draft)

    quoted_price = Column(Numeric(10, 2))
    platform_fee = Column(Numeric(10, 2))
    ca_earnings = Column(Numeric(10, 2))

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    assigned_at = Column(DateTime(timezone=True))
    filed_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())