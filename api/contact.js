// Vercel /api/contact.js
// Expects environment variables: SENDGRID_API_KEY, TO_EMAIL, FROM_EMAIL
// Deploy to Vercel (recommended) or adapt for other providers.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const TO_EMAIL = process.env.TO_EMAIL;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@zauacademy.co.ke';

  if (!SENDGRID_API_KEY || !TO_EMAIL) {
    console.error('Missing SENDGRID_API_KEY or TO_EMAIL');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const payload = {
    personalizations: [{ to: [{ email: TO_EMAIL }] }],
    from: { email: FROM_EMAIL },
    subject: `Website contact from ${name}`,
    content: [
      { type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` }
    ]
  };

  try {
    const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.error('SendGrid error', resp.status, text);
      return res.status(502).json({ error: 'Failed to send email' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Send error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
