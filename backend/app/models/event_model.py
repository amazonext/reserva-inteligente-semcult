from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class EventCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    category: Optional[str] = None
    location_name: str = Field(..., min_length=1)
    address: Optional[str] = None

    start_time: datetime
    end_time: datetime
    is_all_day: bool = False

    requester_name: Optional[str] = None
    requester_cpf: Optional[str] = None

    capacity: Optional[int] = None
    status: str = "pending"


class EventResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    category: Optional[str]
    location_name: str
    address: Optional[str]
    start_time: datetime
    end_time: datetime
    is_all_day: bool
    requester_name: Optional[str]
    requester_cpf: Optional[str]
    capacity: Optional[int]
    status: str
