from fastapi import APIRouter, HTTPException
from app.models.auth_model import AuthCreate, AuthResponse, AuthLogin
from app.repositories.auth_repository import AuthRepository
from app.utils.logs_util import Logger

auth_router = APIRouter(tags=["Auth"])


@auth_router.post("/register", response_model=AuthResponse)
def register(user: AuthCreate):
    Logger.info(f"[ROUTE REGISTER] Requisição recebida: {user.email}")
    result = AuthRepository.register_user(user)

    if "error" in result:
        Logger.warning(f"[ROUTE REGISTER] Falha no registro: {result['error']}")
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Não foi possível completar o cadastro.",
                "reason": result["error"],
                "action": "Verifique os dados enviados e tente novamente.",
            },
        )

    Logger.success(f"[ROUTE REGISTER] Registro finalizado com sucesso: {user.email}")

    # ⚡ Desempacotar o user no mesmo nível do response_model
    return {
        "id": result["user"]["id"],
        "name": result["user"]["name"],
        "email": result["user"]["email"],
        "message": "Cadastro realizado com sucesso.",
        "status": "success",
    }


@auth_router.post("/login")
def login(user: AuthLogin):
    Logger.info(f"[ROUTE LOGIN] Requisição de login recebida: {user.email}")
    result = AuthRepository.login_user(user)

    if "error" in result:
        Logger.warning(f"[ROUTE LOGIN] Falha no login: {result['error']}")
        raise HTTPException(
            status_code=401,
            detail={
                "message": "Falha no login.",
                "error": result["error"],  # <-- EXATAMENTE o erro original
                "action": "Verifique suas credenciais e tente novamente.",
            },
        )

    Logger.success(f"[ROUTE LOGIN] Login finalizado com sucesso: {user.email}")

    return {
        "message": "Login efetuado com sucesso.",
        "auth_id": result["auth_id"],
        "access_token": result["access_token"],
        "refresh_token": result["refresh_token"],
        "status": "success",
    }
