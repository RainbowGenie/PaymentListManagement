from fastapi import FastAPI
from routes import router
from database import check_mongodb_connection, import_csv_to_mongodb
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # List of origins allowed to make requests
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(router)

@app.on_event("startup")
async def startup_event():
    connected = await check_mongodb_connection()
    if not connected:
        raise Exception("Failed to connect to MongoDB!")
    await import_csv_to_mongodb()

@app.get("/")
async def root():
    return {"message": "Welcome to the Payment Management API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
    