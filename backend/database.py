from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure

MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client["payments_db"]
payments_collection = database.get_collection("payments")

async def check_mongodb_connection():
    try:
        # The `ping` command checks the server connection
        await client.admin.command("ping")
        print("MongoDB connected successfully!")
        return True
    except ConnectionFailure as e:
        print(f"MongoDB connection failed: {e}")
        return False