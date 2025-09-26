import string
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for your frontend domain (update for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/scan")
async def scan_qr(request: Request):
    data = await request.json()
    qr_code = data.get("code")
    # Process the QR code here (e.g., validate, store, etc.)
    return {"message": "QR code received", "code": qr_code}