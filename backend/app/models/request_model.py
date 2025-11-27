from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal


class EventCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    start_time: datetime
    end_time: datetime
    location_name: str = Field(..., min_length=1)
    is_public: Literal["public", "private", "restricted"] = "public"
    requester_name: str | None = None
    requester_cpf: str | None = None
    category: str | None = None
    capacity: int | None = None


class EventUpdate(BaseModel):
    title: str | None
    description: str | None
    start_time: datetime | None
    end_time: datetime | None
    location_name: str | None
    is_public: Literal["public", "private", "restricted"] | None
    requester_name: str | None
    requester_cpf: str | None
    category: str | None
    capacity: int | None
    status: Literal["pendent", "accept", "rejected", "scheduled", "cancelled"] | None


class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    start_time: datetime
    end_time: datetime
    location_name: str
    is_public: Literal["public", "private", "restricted"]
    status: Literal["pendent", "accept", "rejected", "scheduled", "cancelled"]
    requester_name: str | None
    requester_cpf: str | None
    created_by: str | None
    category: str | None
    capacity: int | None
