class Logger:
    """
    Logger customizado com cores para diferentes tipos de mensagens.
    """

    COLORS = {
        "success": "\033[92m",  # Verde
        "info": "\033[94m",  # Azul
        "warning": "\033[93m",  # Amarelo
        "error": "\033[91m",  # Vermelho
        "exception": "\033[95m",  # Magenta
        "end": "\033[0m",  # Reset
    }

    @staticmethod
    def success(message: str):
        """
        Log de sucesso.
        """
        print(f"{Logger.COLORS['success']}[SUCCESS] {message}{Logger.COLORS['end']}")

    @staticmethod
    def info(message: str):
        """
        Log informativo.
        """
        print(f"{Logger.COLORS['info']}[INFO] {message}{Logger.COLORS['end']}")

    @staticmethod
    def warning(message: str):
        """
        Log de aviso.
        """
        print(f"{Logger.COLORS['warning']}[WARNING] {message}{Logger.COLORS['end']}")

    @staticmethod
    def error(message: str):
        """
        Log de erro.
        """
        print(f"{Logger.COLORS['error']}[ERROR] {message}{Logger.COLORS['end']}")

    @staticmethod
    def exception(message: str):
        """
        Log de exceção.
        """
        print(
            f"{Logger.COLORS['exception']}[EXCEPTION] {message}{Logger.COLORS['end']}"
        )
