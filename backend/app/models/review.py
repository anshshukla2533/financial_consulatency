from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, CheckConstraint
from sqlalchemy.sql import func

from app.database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(String, primary_key=True, index=True)
    itr_request_id = Column(String, ForeignKey("itr_requests.id"), nullable=False)
    client_id = Column(String, ForeignKey("users.id"), nullable=False)
    ca_id = Column(String, ForeignKey("users.id"), nullable=False)
    rating = Column(Integer, nullable=False)
    review_text = Column(Text)
    response_time_rating = Column(Integer)
    professionalism_rating = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating'),
        CheckConstraint('response_time_rating >= 1 AND response_time_rating <= 5', name='check_response_time'),
        CheckConstraint('professionalism_rating >= 1 AND professionalism_rating <= 5', name='check_professionalism'),
    )