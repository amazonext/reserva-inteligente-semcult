from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.utils.logs_util import Logger

# routes
from app.routes.auth_route import auth_router
from app.routes.request_route import request_router
from app.routes.event_route import event_router


app = FastAPI(title="Reserva Inteligente API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router principal
api_router = APIRouter(prefix="/api")

# Incluindo rotas
api_router.include_router(auth_router, prefix="/auth")
api_router.include_router(request_router, prefix="/requests")
api_router.include_router(event_router, prefix="/events")


# Inclui todas as rotas no app
app.include_router(api_router)


@app.get("/")
def read_root():
    Logger.info("Root endpoint acessado")
    return {"message": "Bem-vindo à API FastAPI!"}


from app.models.request_model import RequestCreate, RequestResponse
from app.repositories.request_repository import RequestRepository


@request_router.post("/", response_model=RequestResponse)
async def create_request(payload: RequestCreate):
    result = RequestRepository.create_request(payload)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
