from fastapi import Depends
from app.auth_utils import get_current_user


@router.post("/", response_model=EventResponse)
async def create_event(event: EventCreate, current_user=Depends(get_current_user)):
    event_data = event.dict()
    event_data["created_by"] = current_user.id  # atribui o usuário logado
    result = await event_repository.create_event(event_data)
    if not result:
        raise HTTPException(status_code=500, detail="Failed to create event")
    return result[0]


@router.get("/", response_model=list[EventResponse])
async def get_events(current_user=Depends(get_current_user)):
    return await event_repository.list_events(current_user.id)


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
