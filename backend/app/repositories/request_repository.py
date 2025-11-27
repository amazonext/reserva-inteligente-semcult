from app.database import supabase
from app.models.request_model import RequestCreate
from app.utils.logs_util import Logger
from datetime import datetime


class RequestRepository:

    @staticmethod
    def create_request(data: RequestCreate) -> dict:
        try:
            Logger.info(f"[REQUEST CREATE] Criando solicitação: {data.title}")

            payload = data.model_dump()
            # Convertendo datetime para string ISO
            payload["start_time"] = payload["start_time"].isoformat()
            payload["end_time"] = payload["end_time"].isoformat()

            response = supabase.table("requests").insert(payload).execute()

            if getattr(response, "error", None):
                Logger.error(f"[REQUEST CREATE] Erro ao inserir: {response.error}")
                return {"error": response.error.get("message", "Insert failed")}

            created = response.data[0]

            # Serializa datetime para string
            for field in ["start_time", "end_time"]:
                if isinstance(created.get(field), datetime):
                    created[field] = created[field].isoformat()

            Logger.success("[REQUEST CREATE] Solicitação criada")
            return created

        except Exception as e:
            Logger.exception(f"[REQUEST CREATE] Falha crítica: {e}")
            return {"error": str(e)}

    @staticmethod
    def list_requests() -> list[dict]:
        try:
            Logger.info("[REQUEST LIST] Obtendo solicitações")

            response = supabase.table("requests").select("*").execute()

            if getattr(response, "error", None):
                Logger.error(f"[REQUEST LIST] Erro: {response.error}")
                return {"error": response.error.get("message", "Fetch failed")}

            data = response.data

            # Serializa datetimes
            for item in data:
                for field in ["start_time", "end_time"]:
                    if isinstance(item.get(field), datetime):
                        item[field] = item[field].isoformat()

            return data

        except Exception as e:
            Logger.exception(f"[REQUEST LIST] Erro crítico: {e}")
            return {"error": str(e)}
