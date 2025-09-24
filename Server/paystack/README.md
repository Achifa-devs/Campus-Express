# Paystack Microservice

Express-based microservice to process Paystack subscription payments for the mobile app and verify transactions server-side before persisting to Postgres.

Key files:
- App entry/router: [paystack/app.js](paystack/app.js)
- Vercel serverless entry: [paystack/api/index.js](paystack/api/index.js)
- Routes: [paystack/routes/paymentRoutes.js](paystack/routes/paymentRoutes.js)
- Controller handlers: [handleWebhook()](paystack/controllers/paymentController.js:4), [verifyPayment()](paystack/controllers/paymentController.js:60)
- Database access: [paystack/config/database.js](paystack/config/database.js), [Payment.create()](paystack/models/payment.js:4), [Payment.findByReference()](paystack/models/payment.js:16), [Payment.updateStatus()](paystack/models/payment.js:22), [Payment.updateSubscriptions()](paystack/models/payment.js:28)

Mobile integration:
- React Native payment UI and verification callout: [app/android/app/src/files/store/utils/Paystack.js](app/android/app/src/files/store/utils/Paystack.js)
  - Configure the server base: set [PAYSTACK_API_BASE](app/android/app/src/files/store/utils/Paystack.js:20) to your deployed Vercel URL.
  - Payment success triggers GET /verify/:reference inside [PaymentScreen.payNow()](app/android/app/src/files/store/utils/Paystack.js:58) to finalize subscription.

## Endpoints

- GET /           Health check (service up) — see [paymentRoutes.js](paystack/routes/paymentRoutes.js)
- GET /health     Health check (service up) — see [paymentRoutes.js](paystack/routes/paymentRoutes.js)
- GET /db/health  Database connectivity check — see [paystack/app.js](paystack/app.js)
- POST /payment   Paystack webhook for asynchronous events — handled in [handleWebhook()](paystack/controllers/paymentController.js:4)
- GET /verify/:reference  Server-side verification of a transaction reference via Paystack REST — handled in [verifyPayment()](paystack/controllers/paymentController.js:60)

Notes:
- Paystack sends amounts in kobo. Both the webhook and verification path normalize to naira before saving.
- Webhook currently trusts Paystack payloads and does not validate signatures. Consider adding signature verification for production hardening.

## Environment Variables

Set these in your environment and in Vercel Project Settings.

- DATABASE_URL (required) — Postgres connection string used by [paystack/config/database.js](paystack/config/database.js)
- PAYSTACK_SECRET_KEY (required) — Your Paystack secret key (sk_test_... or sk_live_...). Used in [verifyPayment()](paystack/controllers/paymentController.js:60) to call Paystack’s verify API.
- PORT (optional) — Local dev port. Default 3000.

Local .env example: [paystack/.env](paystack/.env)
```
DATABASE_URL=postgres://USER:PASS@HOST:PORT/DB
PORT=3000
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

Vercel environment (Project Settings → Environment Variables):
- Add PAYSTACK_SECRET_KEY with the same value.
- Add DATABASE_URL (same as local or a managed DB).
- Redeploy to apply.

## CORS

Basic CORS headers are enabled in [paystack/app.js](paystack/app.js) to allow the mobile app to call GET /verify/:reference. For production, restrict Access-Control-Allow-Origin to your app domains.

## Deploy to Vercel

This project is configured for serverless with:
- Serverless entry wrapper: [paystack/api/index.js](paystack/api/index.js)
- Routing all requests to the serverless function: [paystack/vercel.json](paystack/vercel.json)

Steps:
1) Push to a Git repo (GitHub/GitLab/Bitbucket).
2) Import into Vercel and select the paystack subdirectory as the project root if needed.
3) Configure env vars (DATABASE_URL, PAYSTACK_SECRET_KEY).
4) Deploy. Your base URL will look like: https://your-vercel-app.vercel.app

Update the mobile app:
- Set [PAYSTACK_API_BASE](app/android/app/src/files/store/utils/Paystack.js:20) to your deployed base URL.

## Configure Paystack Webhook

In the Paystack Dashboard → Settings → API:
- Set Webhook URL to:
  https://your-vercel-app.vercel.app/payment

We expect JSON. Signature verification is not yet implemented. Consider adding it in production.

## Smoke Tests

Replace <base> with your deployed URL.

Health
```
curl -s https://<base>/ | jq .
curl -s https://<base>/health | jq .
curl -s https://<base>/db/health | jq .
```

Verify a transaction (after a successful card payment)
```
curl -i https://<base>/verify/REF-123456789-ABCDE
```
Expected 200 response with:
```
{ "ok": true, "status": "success", "reference": "REF-..." }
```

## Local Development

Install deps and run:
```
cd paystack
npm install
npm run dev
# server at http://localhost:3000
```

Test locally:
```
curl -s http://localhost:3000/ | jq .
curl -s http://localhost:3000/db/health | jq .
```

(Optional) Webhooks locally:
- Use ngrok: `ngrok http 3000`
- Set Paystack webhook URL to the ngrok HTTPS URL + /payment

## Data Model Expectations

The code writes to:
- subscription_transactions table (columns incl. subscription_id, amount, status, user_id, created_at) — see [Payment.create()](paystack/models/payment.js:4)
- subscriptions table (columns incl. plan, start_date, end_date, user_id) — see [Payment.updateSubscriptions()](paystack/models/payment.js:28)

Ensure these tables exist with matching columns in your database schema.

## Security & Production Hardening

- Add webhook signature verification for Paystack events inside [handleWebhook()](paystack/controllers/paymentController.js:4)
- Restrict CORS origin in [paystack/app.js](paystack/app.js)
- Validate request bodies and types more strictly before DB writes
- Rate limit verification endpoint if exposed publicly