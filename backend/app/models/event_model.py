from pydantic import BaseModel, Field
from datetime import datetime


class EventCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    start_time: datetime
    end_time: datetime
    location: str = Field(..., min_length=1)
    is_public: bool = True


class EventUpdate(BaseModel):
    title: str | None
    description: str | None
    start_time: datetime | None
    end_time: datetime | None
    location: str | None
    is_public: bool | None


class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    start_time: datetime
    end_time: datetime
    location: str
    is_public: bool
    created_by: str
