from fastapi import APIRouter, HTTPException
from app.models.user_model import UserCreate, UserResponse, UserLogin
from app.repositories.user_repository import UserRepository
from app.utils.logs_util import Logger

user_router = APIRouter(prefix="/users", tags=["users"])


@user_router.post("/register", response_model=UserResponse)
def register(user: UserCreate):
    """
    Register a new user
    """
    Logger.info(f"Requisição de registro recebida: {user.email}")
    result = UserRepository.register_user(user)

    if "error" in result:
        Logger.warning(f"Falha no registro: {result['error']}")
        raise HTTPException(status_code=400, detail=result["error"])

    Logger.success(f"Registro finalizado com sucesso: {user.email}")
    return result["user"]


@user_router.post("/login")
def login(user: UserLogin):
    """
    User login
    """
    Logger.info(f"Requisição de login recebida: {user.email}")
    result = UserRepository.login_user(user)

    if "error" in result:
        Logger.warning(f"Falha no login: {result['error']}")
        raise HTTPException(status_code=401, detail=result["error"])

    Logger.success(f"Login finalizado com sucesso: {user.email}")
    return result
