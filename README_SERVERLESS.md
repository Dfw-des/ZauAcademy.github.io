Serverless contact form (Vercel / Netlify)

Options (no server code):
- Formspree (https://formspree.io): quick, free tier, just set form `action` to Formspree URL.
- Netlify Forms: if you host on Netlify, you can use built-in form handling without JS.
- Getform / Basin: similar hosted form endpoints.

Serverless functions (recommended for validation & deliverability):
- Vercel Serverless (deploy this repo to Vercel): place `api/contact.js` (already added). Configure environment variables in Vercel dashboard:
  - `SENDGRID_API_KEY` — your SendGrid API key
  - `TO_EMAIL` — recipient address (admissions inbox)
  - `FROM_EMAIL` — optional from address (default `no-reply@zauacademy.co.ke`)

- Netlify Functions: you can adapt `api/contact.js` to `netlify/functions/contact.js` and use `process.env` the same way. The endpoint path will be `/.netlify/functions/contact`.

SendGrid notes:
- The function uses SendGrid's Web API v3 to send mail. Ensure your SendGrid account is verified and `FROM_EMAIL` is authorized if required.

Local testing:
- Serverless functions won't run under `python -m http.server`. To test locally, use Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

- Then visit `http://localhost:3000` and submit the form; the function runs locally with your environment variables set with `vercel env` or `.env` when developing.

Alternative quick setup with Formspree (no code changes):
1. Go to https://formspree.io and create a form; you'll receive an endpoint like `https://formspree.io/f/{id}`.
2. Change the form in `contact.html` to `<form action="https://formspree.io/f/{id}" method="POST">` and remove the client-side JS handler if desired.

Security & best practices:
- Never commit API keys. Use the hosting provider's environment variables.
- Validate and sanitize input on the server before sending emails.
- Add rate limiting / CAPTCHA if you expect spam.

If you want, I can:
- Adapt the function to Netlify format.
- Add support for Mailgun/Gmail SMTP (nodemailer) instead of SendGrid.
- Implement a basic spam-protection step (honeypot field or reCAPTCHA).
