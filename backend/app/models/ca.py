from sqlalchemy import Column, String, Integer, Text, Numeric, Boolean, DateTime, ForeignKey, ARRAY
from sqlalchemy.sql import func

from app.database import Base

class CAProfile(Base):
    __tablename__ = "ca_profiles"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    ca_membership_number = Column(String, unique=True, nullable=False)
    firm_name = Column(String)
    years_of_experience = Column(Integer)
    specializations = Column(ARRAY(String))
    languages = Column(ARRAY(String))
    base_price = Column(Numeric(10, 2))
    rating = Column(Numeric(3, 2), default=0.00)
    total_reviews = Column(Integer, default=0)
    total_filings = Column(Integer, default=0)
    turnaround_time_hours = Column(Integer)
    bio = Column(Text)
    profile_image_url = Column(Text)
    is_verified = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)
    city = Column(String)
    state = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())