# External APIs

## Resend Email API

- **Purpose:** Send contact form submissions as email notifications
- **Documentation:** https://resend.com/docs
- **Base URL(s):** https://api.resend.com
- **Authentication:** API Key (Bearer token)
- **Rate Limits:** 100 emails/day (free tier), 3000/month

**Key Endpoints Used:**
- `POST /emails` - Send an email

**Integration Notes:**
- API key stored in `RESEND_API_KEY` environment variable
- Use SDK: `npm install resend`
- Sender domain must be verified or use onboarding domain

---
