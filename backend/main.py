from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API FastAPI!"}


@app.get("/test")
def test_connection():
    return {"status": "ok", "message": "Conexão com backend bem-sucedida!"}
