from fastapi import APIRouter, HTTPException
from app.models.event_model import EventCreate, EventUpdate, EventResponse
from app.repositories import event_repository

router = APIRouter(prefix="/events", tags=["Events"])


@router.post("/", response_model=EventResponse)
async def create_event(event: EventCreate):
    result = await event_repository.create_event(event.dict())
    if not result:
        raise HTTPException(status_code=500, detail="Failed to create event")
    return result[0]


@router.get("/", response_model=list[EventResponse])
async def get_events():
    return await event_repository.list_events()


@router.get("/{event_id}", response_model=EventResponse)
async def get_event(event_id: str):
    result = await event_repository.get_event(event_id)
    if not result:
        raise HTTPException(status_code=404, detail="Event not found")
    return result


@router.put("/{event_id}", response_model=EventResponse)
async def update_event(event_id: str, event: EventUpdate):
    result = await event_repository.update_event(
        event_id, event.dict(exclude_unset=True)
    )
    if not result:
        raise HTTPException(status_code=404, detail="Event not found or not updated")
    return result


@router.delete("/{event_id}")
async def delete_event(event_id: str):
    success = await event_repository.delete_event(event_id)
    if not success:
        raise HTTPException(status_code=404, detail="Event not found or not deleted")
    return {"detail": "Event deleted successfully"}
