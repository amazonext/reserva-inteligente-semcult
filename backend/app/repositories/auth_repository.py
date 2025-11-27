from app.database import supabase
from app.models.auth_model import AuthCreate, AuthLogin
from app.utils.logs_util import Logger


class AuthRepository:
    """
    Repository for authentication-related operations using Supabase Auth.
    """

    # SIGN UP
    @staticmethod
    def register_user(user: AuthCreate) -> dict:
        """
        Registers a new user in Supabase Auth and creates a profile.
        """
        try:
            Logger.info(f"[REGISTER] Tentando registrar usuário: {user.email}")

            # Valida se já existe perfil com o mesmo email
            existing_user = AuthRepository.get_auth_by_email(user.email)
            if existing_user:
                Logger.warning(f"[REGISTER] Usuário já existe: {user.email}")
                return {"error": "User already exists"}

            # Cria usuário no Supabase Auth
            auth_response = supabase.auth.sign_up(
                {"email": user.email, "password": user.password}
            )
            Logger.info(f"[REGISTER] Resposta do Supabase sign_up: {auth_response}")

            # Acessa o usuário e a sessão via atributos
            user_created = getattr(auth_response, "user", None)
            session_created = getattr(auth_response, "session", None)

            if not user_created:
                Logger.error(f"[REGISTER] Falha no signup: {auth_response}")
                return {"error": "Failed to create user in Auth"}

            # Cria perfil no banco
            profile_data = {
                "id": user_created.id,
                "name": user.name,
                "email": user.email,
            }
            db_response = supabase.table("profiles").insert(profile_data).execute()
            Logger.info(
                f"[REGISTER] Resposta do Supabase insert profile: {db_response}"
            )

            if getattr(db_response, "error", None):
                Logger.error(f"[REGISTER] Falha ao criar perfil: {db_response.error}")
                return {"error": "Failed to create user profile"}

            Logger.success(f"[REGISTER] Usuário registrado com sucesso: {user.email}")
            return {"user": profile_data}

        except Exception as e:
            Logger.exception(f"[REGISTER] Erro no registro: {e}")
            return {"error": str(e)}

    # SIGN IN
    @staticmethod
    def login_user(user: AuthLogin) -> dict:
        """
        Logs in the user using Supabase Auth (email and password).
        Returns tokens, user id and profile name.
        """
        try:
            Logger.info(f"[LOGIN] Tentando login do usuário: {user.email}")

            auth_response = supabase.auth.sign_in_with_password(
                {"email": user.email, "password": user.password}
            )
            Logger.info(f"[LOGIN] Resposta do Supabase sign_in: {auth_response}")

            user_data = getattr(auth_response, "user", None)
            session_data = getattr(auth_response, "session", None)

            if user_data and session_data:
                Logger.success(f"[LOGIN] Login bem-sucedido: {user.email}")
                return {
                    "auth_id": user_data.id,
                    "access_token": session_data.access_token,
                    "refresh_token": session_data.refresh_token,
                }

            Logger.warning(f"[LOGIN] Credenciais inválidas: {user.email}")
            return {"error": "Invalid credentials"}

        except Exception as e:
            Logger.exception(f"[LOGIN] Erro no login: {e}")
            return {"error": str(e)}

    # GET USER BY EMAIL (PROFILES)
    @staticmethod
    def get_auth_by_email(email: str) -> dict | None:
        """
        Retrieves a user profile from the 'profiles' table by email.
        """
        try:
            Logger.info(f"[GET USER] Buscando usuário por email: {email}")

            response = (
                supabase.table("profiles").select("*").eq("email", email).execute()
            )
            Logger.info(f"[GET USER] Resposta do Supabase select: {response}")

            if getattr(response, "data", None) and len(response.data) > 0:
                Logger.info(f"[GET USER] Usuário encontrado: {email}")
                return response.data[0]

            Logger.info(f"[GET USER] Usuário não encontrado: {email}")
            return None

        except Exception as e:
            Logger.exception(f"[GET USER] Erro ao buscar usuário: {e}")
            return None

    # LOGOUT
    @staticmethod
    def logout(refresh_token: str) -> dict:
        """
        Logs out the user by invalidating the current refresh token.
        """
        try:
            Logger.info("[LOGOUT] Realizando logout...")

            supabase.auth.sign_out()

            Logger.success("[LOGOUT] Logout realizado com sucesso")
            return {"message": "Logged out successfully"}

        except Exception as e:
            Logger.exception(f"[LOGOUT] Erro ao realizar logout: {e}")
            return {"error": str(e)}

    # REFRESH TOKEN
    @staticmethod
    def refresh_session(refresh_token: str) -> dict:
        """
        Gets a new access token using a refresh token.
        """
        try:
            Logger.info("[REFRESH] Atualizando sessão via refresh token...")

            session = supabase.auth.refresh_session(refresh_token)
            Logger.info(f"[REFRESH] Nova sessão: {session}")

            return {
                "access_token": session.session.access_token,
                "refresh_token": session.session.refresh_token,
            }

        except Exception as e:
            Logger.exception(f"[REFRESH] Erro no refresh token: {e}")
            return {"error": str(e)}
