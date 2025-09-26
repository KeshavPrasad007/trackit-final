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
async def scan_qr(data: dict):
    code = data.get("code")
    # Save code to database or process as needed
    print(f"Received QR code: {code}")
    return {"status": "success", "code": code}