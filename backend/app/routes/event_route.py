from fastapi import APIRouter, HTTPException
from app.models.event_model import EventCreate, EventResponse
from app.repositories.event_repository import EventRepository
from app.utils.logs_util import Logger

event_router = APIRouter(tags=["Events"])


@event_router.post("/", response_model=EventResponse)
def create_event(payload: EventCreate):
    Logger.info(f"[ROUTE EVENT] Recebido: {payload.title}")

    result = EventRepository.create_event(payload)

    if "error" in result:
        Logger.warning(f"[ROUTE EVENT] Falha: {result['error']}")
        raise HTTPException(status_code=400, detail=result["error"])

    return result


@event_router.get("/")
def list_events():
    Logger.info("[ROUTE EVENT LIST]")
    return EventRepository.list_events()
