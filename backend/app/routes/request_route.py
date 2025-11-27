# app/routes/request_routes.py
from fastapi import APIRouter, HTTPException
from app.models.request_model import RequestCreate, RequestResponse
from app.repositories.request_repository import RequestRepository

request_router = APIRouter(tags=["Requests"])


@request_router.post("/", response_model=RequestResponse)
async def create_request(payload: RequestCreate):
    result = RequestRepository.create_request(payload)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result


@request_router.get("/", response_model=list[RequestResponse])
async def list_requests():
    result = RequestRepository.list_requests()
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
