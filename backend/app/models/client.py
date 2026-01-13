from sqlalchemy import Column, String, Date, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base

class ClientProfile(Base):
    __tablename__ = "client_profiles"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    pan_number = Column(String, unique=True)
    aadhaar_number_encrypted = Column(Text)
    date_of_birth = Column(Date)
    address = Column(Text)
    city = Column(String)
    state = Column(String)
    pincode = Column(String)
    preferred_language = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())