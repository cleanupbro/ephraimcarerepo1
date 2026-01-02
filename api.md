# API KEYS - Ephraim Care
> **DO NOT COMMIT TO GIT** - Add to .gitignore
> Last Updated: December 31, 2025

---

## ACTIVE INTEGRATIONS (Using Now)

### N8N Webhooks (CONNECTED)
```yaml
Instance: https://nioctibinu.online
Referral: https://nioctibinu.online/webhook/ephraim/referral
Contact: https://nioctibinu.online/webhook/ephraim/contact
Status: LIVE ✅
```

### WhatsApp Business
```yaml
Phone Number ID: 849886178205365
Business Account ID: 2326166361168426
Test Number: +1 555 632 3714
Target: +61 406 764 585
Access Token: EAAZAo7ucsqF8BQTkO0bpkPUoSNNk5tYD4tDCherk5OOBHp2ETth2eZBuzu3uOvPJT2zzCZATiIWRlYjFokHIFLnZBYangPTKSIVzcav2jpZAuG0Yk8yTKMMJ3cYk81PPi4dIcsVO5AwAKZANShNbYgumNws2VtvqexgfXnKnSo8P8kwDkOP9WScqHCTqjxX2i4jeFZAHDenFGCm5wOJBigZAtc9H4xLUxreKZBuw6ZBK5T8rvsU4gXO2bwt2VCBkcpm1vZAOa2XLO1Eyuy161wZAZBfAZB0nFKeCMThZCDM79k3MrMZD
```

### Twilio (SMS)
```yaml
# LIVE
Account SID: ACcab17ff4715c7a15971859843d74d0ae
Auth Token: 49ecf08c49e6fb171aedb0325f0adfb1
API Key SID: SK8520a9596277163216c4f94239cddbd7
API Secret: mJaLAPsenchDEPqxFy1AXyqoszSjZCQ9

# TEST
Test Account SID: AC7faaaa03026f0279d112c6fcd60e06d0
Test Auth Token: 40dd0555c2a10252147859bcf6d5a19f
```

### Gmail SMTP
```yaml
Email: cleanupbros.au@gmail.com
SMTP Server: smtp.gmail.com
SMTP Port: 587
App Password: [NEED FROM MESHACH FOR info@ephraimcare.com.au]
```

### Vercel
```yaml
API Key: vck_2govisZDoLdtuK48xMq3z7VsUe80zBqXbWBnDPlIqJzZ6j77ib1Nn5UG
Client Secret: kdDBsACg5ymzGiPK9gEtJqAC
Ephraim Project Token: h7E9EBfXuCCqxiJF8NpFYt0q
```

---

## GOOGLE SERVICES

### Google AI Studio / Gemini
```yaml
API Key: AIzaSyCjpMwASVymgYvGeRe6QYpMCovdK4SXImE
Project ID: 789855447864
```

### Google OAuth
```yaml
Client ID: 789855447864-npndu9bcoebs9ogvcipagu40vntianms.apps.googleusercontent.com
Client Secret: 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
Project: gen-lang-client-0466569515
```

### Service Account
```yaml
Name: ANTIGRAVITY
Email: antigravity@gen-lang-client-0466569515.iam.gserviceaccount.com
Unique ID: 113687034107276075103
Key: 61856bb57d8fa67bfb5ed9398d287d64474e6fab
```

---

## PAYMENT APIs

### Square Production
```yaml
Application ID: sq0idp-26xaIluyXJ4kKz6dT6noOA
Access Token: EAAAl3kNvosM1d39Cze5X7l2RFakA2rHGXjQzA3dbMKL-yi5sUqW56OzGn_r9cXW
```

### Square Sandbox
```yaml
Application ID: sandbox-sq0idb-EKSP0HRje16ZEC52qKAAZw
Access Token: EAAAl6Dap-6vVTokmvbrIShaStCPkFRvaKSCfnOX9uwk3zdJXm6P6s0oKJvKUGKu
```

---

## OTHER APIs (Available)

### GitHub
```yaml
Token: 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
User: cleanupbro
OpBros Repo: https://github.com/cleanupbro/opbros.automation.git
```

### Hugging Face
```yaml
Token: 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
Email: hafsahnuzhat1303@gmail.com
```

### Mistral AI
```yaml
Org ID: c1a87462-f36c-4351-b26d-1bd6e6ce42e0
API Key: 3CHJVvXoIvWIqZKUtfIjM1x6ahEOCpZm
Docs: https://docs.mistral.ai/api
```

### Pinecone (Vector DB)
```yaml
API Key: pcsk_4ksdR5_Cj1WyEiP3U211ndXQtbnRa4GV1v1L5CVYxkLvcF55g7vcUe44ugCpBDVtQAZcQC
```

### Qdrant Cloud
```yaml
API Key: 9a1e6acc-34ca-4255-8e6b-523d146074c7|tHtQSoX0n7EFLcWP5VlAQOlddLFJEP_Ky0eo2qQTFq0eNZR6w0Mqjg
```

### Calendly
```yaml
Booking Link: https://calendly.com/theopbros-ai/30min
```

---

## ENV TEMPLATE FOR EPHRAIM CARE

```env
# N8N Webhooks (LIVE)
WEBHOOK_REFERRAL=https://nioctibinu.online/webhook/ephraim/referral
WEBHOOK_CONTACT=https://nioctibinu.online/webhook/ephraim/contact

# WhatsApp Business
WHATSAPP_PHONE_ID=849886178205365
WHATSAPP_BUSINESS_ID=2326166361168426
WHATSAPP_ACCESS_TOKEN=EAAZAo7ucsqF8BQTkO0bpkPUoSNNk5tYD4tDCherk5OOBHp2ETth2eZBuzu3uOvPJT2zzCZATiIWRlYjFokHIFLnZBYangPTKSIVzcav2jpZAuG0Yk8yTKMMJ3cYk81PPi4dIcsVO5AwAKZANShNbYgumNws2VtvqexgfXnKnSo8P8kwDkOP9WScqHCTqjxX2i4jeFZAHDenFGCm5wOJBigZAtc9H4xLUxreKZBuw6ZBK5T8rvsU4gXO2bwt2VCBkcpm1vZAOa2XLO1Eyuy161wZAZBfAZB0nFKeCMThZCDM79k3MrMZD

# Twilio SMS
TWILIO_ACCOUNT_SID=ACcab17ff4715c7a15971859843d74d0ae
TWILIO_AUTH_TOKEN=49ecf08c49e6fb171aedb0325f0adfb1
TWILIO_API_KEY=SK8520a9596277163216c4f94239cddbd7
TWILIO_API_SECRET=mJaLAPsenchDEPqxFy1AXyqoszSjZCQ9

# Vercel
VERCEL_TOKEN=h7E9EBfXuCCqxiJF8NpFYt0q

# Google
GOOGLE_AI_KEY=AIzaSyCjpMwASVymgYvGeRe6QYpMCovdK4SXImE
```

---

*Add api.md to .gitignore immediately*
