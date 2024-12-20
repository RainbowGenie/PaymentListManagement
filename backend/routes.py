from fastapi import APIRouter, HTTPException
from database import payments_collection
from models import Payment
from bson import ObjectId

router = APIRouter()

@router.post("/payments/")
async def create_payment(payment: Payment):
    payment_dict = payment.dict()
    result = payments_collection.insert_one(payment_dict)
    return {"id": str(result.inserted_id)}

@router.get("/payments/")
async def get_payments():
    payments = list(payments_collection.find({}))
    for payment in payments:
        payment["_id"] = str(payment["_id"])
    return payments

@router.put("/payments/{payment_id}")
async def update_payment(payment_id: str, payment: Payment):
    result = payments_collection.update_one({"_id": ObjectId(payment_id)}, {"$set": payment.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment updated"}

@router.delete("/payments/{payment_id}")
async def delete_payment(payment_id: str):
    result = payments_collection.delete_one({"_id": ObjectId(payment_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment deleted"}