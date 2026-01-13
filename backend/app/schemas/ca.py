from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal

class CAProfileBase(BaseModel):
    ca_membership_number: str
    firm_name: Optional[str] = None
    years_of_experience: Optional[int] = None
    specializations: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    base_price: Optional[Decimal] = None
    bio: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None

class CAProfileCreate(CAProfileBase):
    pass

class CAProfileUpdate(CAProfileBase):
    is_available: Optional[bool] = None

class CAProfile(CAProfileBase):
    id: str
    user_id: str
    rating: Decimal
    total_reviews: int
    total_filings: int
    turnaround_time_hours: Optional[int]
    profile_image_url: Optional[str]
    is_verified: bool
    is_available: bool
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True