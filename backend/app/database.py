from supabase import create_client, Client
from app.core.config import SUPABASE_URL, SUPABASE_KEY
from requests.exceptions import RequestException

# Códigos de cores ANSI
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    if supabase.table("profiles").select("*").limit(1).execute().data is not None:
        print(f"{GREEN}Conexão com Supabase estabelecida com sucesso!{RESET}")
except RequestException as e:
    print(f"{RED}Falha ao conectar com Supabase: {e}{RESET}")
