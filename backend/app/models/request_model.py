from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class RequestCreate(BaseModel):
    requester_name: str = Field(..., min_length=1)
    requester_cpf: str = Field(..., min_length=11)
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    location_name: str = Field(..., min_length=1)
    capacity: int = Field(..., ge=1)


class RequestResponse(BaseModel):
    id: str
    requester_name: str
    requester_cpf: str
    title: str
    description: Optional[str]
    start_time: str
    end_time: str
    location_name: str
    capacity: int
    status: str
