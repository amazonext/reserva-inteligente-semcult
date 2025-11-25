from app.database import supabase
from app.utils.logs_util import Logger

logger = Logger("EventRepository")

TABLE_NAME = "events"


async def create_event(event_data: dict):
    try:
        response = supabase.table(TABLE_NAME).insert(event_data).execute()
        return response.data
    except Exception as e:
        logger.error(f"Failed to create event: {e}")
        return None


async def get_event(event_id: str):
    try:
        response = supabase.table(TABLE_NAME).select("*").eq("id", event_id).execute()
        return response.data[0] if response.data else None
    except Exception as e:
        logger.error(f"Failed to get event: {e}")
        return None


async def list_events(user_id: str):
    try:
        response = (
            supabase.table(TABLE_NAME)
            .select("*")
            .or_(f"is_public.eq.true,created_by.eq.{user_id}")
            .execute()
        )
        return response.data
    except Exception as e:
        logger.error(f"Failed to list events: {e}")
        return []


async def update_event(event_id: str, update_data: dict):
    try:
        response = (
            supabase.table(TABLE_NAME).update(update_data).eq("id", event_id).execute()
        )
        return response.data[0] if response.data else None
    except Exception as e:
        logger.error(f"Failed to update event: {e}")
        return None


async def delete_event(event_id: str):
    try:
        response = supabase.table(TABLE_NAME).delete().eq("id", event_id).execute()
        return True
    except Exception as e:
        logger.error(f"Failed to delete event: {e}")
        return False
