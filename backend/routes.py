from fastapi import APIRouter, HTTPException, Query
from database import payments_collection
from models import Payment
from bson import ObjectId

router = APIRouter()

@router.post("/payments/")
async def create_payment(payment: Payment) -> dict:
    payment_dict = payment.dict()
    result = await payments_collection.insert_one(payment_dict)
    return {"id": str(result.inserted_id)}

@router.get("/payments/")
async def get_payments(page: int = Query(1), size: int = Query(10)) -> dict:
    skip = (page - 1) * size
    payments = await payments_collection.find({}).skip(skip).limit(size).to_list()
    total = await payments_collection.count_documents({})
    for payment in payments:
        payment["_id"] = str(payment["_id"])  # Convert ObjectId to string
    return {"data": payments, "total": total}

@router.get("/payments/{payment_id}")
async def get_payment_by_id(payment_id: str) -> dict:
    payment = await payments_collection.find_one({"_id": ObjectId(payment_id)})
    if payment:
        payment['_id'] = str(payment['_id'])
        return payment
    return {"message": "Payment not found"}

@router.put("/payments/{payment_id}")
async def update_payment(payment_id: str, payment: Payment) -> dict:
    result = await payments_collection.update_one({"_id": ObjectId(payment_id)}, {"$set": payment.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment updated"}

@router.delete("/payments/{payment_id}")
async def delete_payment(payment_id: str):
    result = await payments_collection.delete_one({"_id": ObjectId(payment_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment deleted"}
