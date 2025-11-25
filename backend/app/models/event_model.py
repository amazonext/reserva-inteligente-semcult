from pydantic import BaseModel, Field
from datetime import date, time


class EventCreate(BaseModel):
    """
    Schema for creating cultural events.
    """

    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    date: date
    start_time: time
    end_time: time
    location: str = Field(..., min_length=1)


class EventUpdate(BaseModel):
    """
    Schema for updating cultural events.
    """

    title: str | None
    description: str | None
    date: date | None
    start_time: time | None
    end_time: time | None
    location: str | None


class EventResponse(BaseModel):
    """
    Schema for event responses.
    """

    id: str
    title: str
    description: str
    date: date
    start_time: time
    end_time: time
    location: str
