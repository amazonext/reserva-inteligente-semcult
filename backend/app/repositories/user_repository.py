from app.database import supabase
from app.models.user_model import UserCreate, UserLogin
from app.utils.logs_util import Logger


class UserRepository:
    """
    Repository for user-related database operations using Supabase.
    """

    @staticmethod
    def register_user(user: UserCreate) -> dict:
        """
        Registers a user with Supabase Auth and stores the user's name in the 'profiles' table.
        Returns a structured dict with the user profile or an error.
        """
        try:
            Logger.info(f"Tentando registrar usuário: {user.email}")

            # Check if user already exists
            existing_user = UserRepository.get_user_by_email(user.email)
            if existing_user:
                Logger.warning(f"Usuário já existe: {user.email}")
                return {"error": "User already exists"}

            # Create user in Supabase Auth
            auth_response = supabase.auth.sign_up(
                {"email": user.email, "password": user.password}
            )

            if not getattr(auth_response, "user", None):
                Logger.error(f"Falha ao registrar usuário no Auth: {auth_response}")
                return {"error": "Registration failed in Auth"}

            profile_data = {
                "id": auth_response.user.id,
                "name": user.name,
                "email": user.email,
            }

            # Insert into profiles table
            db_response = supabase.table("profiles").insert(profile_data).execute()

            if getattr(db_response, "error", None):
                Logger.error(f"Falha ao salvar perfil: {db_response.error}")
                return {"error": "Profile creation failed"}

            Logger.success(f"Usuário registrado com sucesso: {user.name}")
            return {"user": profile_data}

        except Exception as e:
            Logger.exception(f"Erro ao registrar usuário: {e}")
            return {"error": str(e)}

    @staticmethod
    def login_user(user: UserLogin) -> dict:
        """
        Logs in a user with Supabase Auth.
        Returns token, user data, or error.
        """
        try:
            Logger.info(f"Tentando login do usuário: {user.email}")
            response = supabase.auth.sign_in(email=user.email, password=user.password)

            if getattr(response, "user", None):
                Logger.success(f"Login bem-sucedido: {user.email}")
                return {
                    "user_id": response.user.id,
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                }

            Logger.warning(f"Falha no login: {response}")
            return {"error": "Invalid credentials"}

        except Exception as e:
            Logger.exception(f"Erro ao realizar login: {e}")
            return {"error": str(e)}

    @staticmethod
    def get_user_by_email(email: str) -> dict | None:
        """
        Retrieves a user profile from the 'profiles' table by email.
        Returns None if not found.
        """
        try:
            Logger.info(f"Buscando usuário por email: {email}")
            response = (
                supabase.table("profiles").select("*").eq("email", email).execute()
            )
            if getattr(response, "data", None) and len(response.data) > 0:
                Logger.info(f"Usuário encontrado: {email}")
                return response.data[0]
            Logger.info(f"Usuário não encontrado: {email}")
            return None
        except Exception as e:
            Logger.exception(f"Erro ao buscar usuário por email: {e}")
            return None
