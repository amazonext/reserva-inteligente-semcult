from app.database import supabase
from app.models.event_model import EventCreate
from app.utils.logs_util import Logger


class EventRepository:

    @staticmethod
    def create_event(data: EventCreate) -> dict:
        try:
            Logger.info(f"[EVENT CREATE] Criando evento: {data.title}")

            payload = data.model_dump()
            response = supabase.table("cultural_events").insert(payload).execute()

            if getattr(response, "error", None):
                Logger.error(f"[EVENT CREATE] Erro ao inserir: {response.error}")
                return {"error": response.error.get("message", "Insert failed")}

            Logger.success("[EVENT CREATE] Evento criado")
            return response.data[0]

        except Exception as e:
            Logger.exception(f"[EVENT CREATE] Falha crítica: {e}")
            return {"error": str(e)}

    @staticmethod
    def list_events() -> dict:
        try:
            Logger.info("[EVENT LIST] Listando eventos")

            response = supabase.table("cultural_events").select("*").execute()

            if getattr(response, "error", None):
                return {"error": response.error}

            return response.data

        except Exception as e:
            Logger.exception(f"[EVENT LIST] Erro crítico: {e}")
            return {"error": str(e)}
