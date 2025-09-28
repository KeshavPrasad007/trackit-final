import string
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def send_confirmation_email(to_email: str):
    gmail_user = 'yourstrackit@gmail.com'
    gmail_password = 'kpokss@28'  # Use an App Password

    subject = 'Login Confirmation'
    body = f'Hello,\n\nYour login was successful!\n\nThank you for using our service.'

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = gmail_user
    msg['To'] = to_email

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, to_email, msg.as_string())
        server.quit()
        print(f"Confirmation email sent to {to_email}")
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False

@app.post("/scan")
async def scan_qr(request: Request):
    data = await request.json()
    qr_code = data.get("code")
    return {"message": "QR code received", "code": qr_code}

@app.post("/login")
async def login(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")
    print(f"Login attempt: {email}, role: {role}")
    # Send confirmation email
    email_sent = send_confirmation_email(email)
    if email_sent:
        return {"status": "success", "message": f"Confirmation email sent to {email}"}
    else:
        return {"status": "error", "message": "Failed to send confirmation email"}