from fastapi import FastAPI
from database import check_mongodb_connection

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    connected = await check_mongodb_connection()
    if not connected:
        raise Exception("Failed to connect to MongoDB!")

@app.get("/")
async def root():
    return {"message": "Welcome to the Payment Management API"}