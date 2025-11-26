from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.utils.logs_util import Logger

# routes
from app.routes.auth_route import auth_router
# from app.routes.event_route import event_router

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

# Subrota de teste
test_router = APIRouter()


@test_router.get("/")
def test_subroute():
    Logger.info("Subrota de teste acessada")
    return {"status": "ok", "message": "Subrota funcionando com sucesso!"}


api_router.include_router(test_router, prefix="/test", tags=["System"])

# Inclui todas as rotas no app
app.include_router(api_router)


@app.get("/")
def read_root():
    Logger.info("Root endpoint acessado")
    return {"message": "Bem-vindo à API FastAPI!"}
