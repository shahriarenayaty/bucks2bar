import os
import re
import base64
import smtplib
from email.message import EmailMessage
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust this list to restrict domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PORT = int(os.getenv("PORT", 3000))

class EmailPayload(BaseModel):
    email: EmailStr
    image: str

def validate_email(email: str) -> bool:
    re_email = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
    return re_email.match(email.lower()) is not None

@app.post("/send-email")
async def send_email(payload: EmailPayload):
    email = payload.email
    image = payload.image

    if not validate_email(email):
        raise HTTPException(status_code=400, detail="Invalid email address.")

    # SMTP configuration identical to the Node version
    smtp_server = "smtp.resend.com"
    smtp_port = 465
    smtp_user = "resend"
    smtp_pass = os.getenv("RESEND_API_KEY")
    if not smtp_pass:
        raise HTTPException(status_code=500, detail="SMTP authentication credentials not provided.")

    try:
        # Build the email message
        message = EmailMessage()
        message["Subject"] = "Your Chart Image"
        message["From"] = "test@resend.dev"
        message["To"] = email
        message.set_content("Please find your chart image attached.")

        # Extract base64 data; assume input is in format "data:image/png;base64,..."
        base64_data = image.split(",")[1] if "," in image else image
        img_bytes = base64.b64decode(base64_data)

        message.add_attachment(img_bytes, maintype="image", subtype="png", filename="chart.png")

        # Send the email using secure SMTP
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            server.login(smtp_user, smtp_pass)
            server.send_message(message)

        return {"message": "Email sent successfully!"}
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Failed to send email.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=PORT)