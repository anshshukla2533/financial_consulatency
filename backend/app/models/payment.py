from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, Enum
import enum

from app.database import Base

class PaymentMethod(str, enum.Enum):
    upi = "upi"
    card = "card"
    netbanking = "netbanking"
    wallet = "wallet"

class PaymentStatus(str, enum.Enum):
    pending = "pending"
    completed = "completed"
    failed = "failed"
    refunded = "refunded"

class Payment(Base):
    __tablename__ = "payments"

    id = Column(String, primary_key=True, index=True)
    itr_request_id = Column(String, ForeignKey("itr_requests.id"), nullable=False)
    client_id = Column(String, ForeignKey("users.id"), nullable=False)
    ca_id = Column(String, ForeignKey("users.id"))

    amount = Column(Numeric(10, 2), nullable=False)
    platform_fee = Column(Numeric(10, 2), nullable=False)
    ca_earnings = Column(Numeric(10, 2), nullable=False)

    payment_method = Column(Enum(PaymentMethod), nullable=False)
    payment_gateway = Column(String)
    transaction_id = Column(String, unique=True)
    payment_status = Column(Enum(PaymentStatus), default=PaymentStatus.pending)

    paid_at = Column(DateTime(timezone=True))
    refunded_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default="now()")