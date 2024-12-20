from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
import pandas as pd
from pathlib import Path

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

async def import_csv_to_mongodb():
  if "payments" not in await database.list_collection_names() or await payments_collection.estimated_document_count() == 0:
    # Define the path to your CSV file
    csv_file_path = Path(__file__).parent / "payment_information.csv"
    
    # Check if file exists
    if not csv_file_path.exists():
        print(f"CSV file {csv_file_path} not found.")
        return

    # Read the CSV into a pandas DataFrame
    df = pd.read_csv(csv_file_path)

    # Convert DataFrame to a list of dictionaries for MongoDB insertion
    payments = df.to_dict(orient="records")

    # Insert records into the MongoDB collection
    if payments:
        payments_collection.insert_many(payments)
        print(f"{len(payments)} payments imported into MongoDB.")
    else:
        print("No data to import.")