/**
 * /api/correction.js
 *
 * Vercel serverless function that receives the Username Correction form
 * submission, validates server-side, and forwards to the Make.com webhook
 * for the Tally-Username-Correction-v1 scenario.
 *
 * Endpoint: POST /api/correction
 * Expected body: { email, tv_username, whop_order_id }
 * Response: { success: true } or { error: "..." }
 */

const MAKE_WEBHOOK = 'https://hook.us2.make.com/q45ytmyb9stwv71ovt0ctfizfc8l6tg8';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;
const ORDER_ID_REGEX = /^[a-zA-Z0-9_-]{0,40}$/; // optional, lenient

export default async function handler(req, res) {
  // CORS — same origin only, no preflight headers needed for Vercel/same-domain
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse body (Vercel parses JSON automatically when Content-Type is set)
  const body = req.body || {};
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const tv_username = typeof body.tv_username === 'string' ? body.tv_username.trim().toLowerCase() : '';
  const whop_order_id = typeof body.whop_order_id === 'string' ? body.whop_order_id.trim() : '';

  // Validation
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  if (!tv_username || !USERNAME_REGEX.test(tv_username)) {
    return res.status(400).json({ error: 'Invalid TradingView username (3–30 chars, letters/numbers/underscore)' });
  }
  if (whop_order_id && !ORDER_ID_REGEX.test(whop_order_id)) {
    return res.status(400).json({ error: 'Invalid Whop Order ID format' });
  }

  // Sanity: limit payload size
  if (email.length > 200 || tv_username.length > 50 || whop_order_id.length > 50) {
    return res.status(400).json({ error: 'Payload too large' });
  }

  // Build Make payload
  const makePayload = {
    email,
    tv_username,
    whop_order_id: whop_order_id || null,
    submitted_at: new Date().toISOString(),
    source: 'rainbowmatrix.ai/correction',
    user_agent: (req.headers['user-agent'] || '').substring(0, 200),
    ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
  };

  try {
    const response = await fetch(MAKE_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(makePayload)
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error('[correction] Make webhook failed:', response.status, errText);
      return res.status(502).json({ error: 'Upstream service unavailable. Please try again in a moment.' });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('[correction] Forward error:', err);
    return res.status(500).json({ error: 'Internal server error. Please try again or contact support.' });
  }
}
