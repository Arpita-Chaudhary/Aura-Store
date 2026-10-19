import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import crypto from 'node:crypto';

const RAZORPAY_KEY_ID = 'rzp_test_TpfkiTfZiOzrhH';
const RAZORPAY_KEY_SECRET = 'JAuM5MDj3E9ume8qr3PuLE0Q';

function razorpayApiPlugin() {
  return {
    name: 'razorpay-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/razorpay/create-order' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const amountInPaise = Math.round(Number(data.amount || 100) * 100);
              const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

              const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${auth}`
                },
                body: JSON.stringify({
                  amount: amountInPaise,
                  currency: 'INR',
                  receipt: `aura_${Date.now()}`
                })
              });

              const order = await rzpRes.json();
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  keyId: RAZORPAY_KEY_ID,
                  order
                })
              );
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (req.url === '/api/razorpay/verify-payment' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = JSON.parse(body || '{}');
              const expectedSignature = crypto
                .createHmac('sha256', RAZORPAY_KEY_SECRET)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest('hex');

              const isValid = expectedSignature === razorpay_signature;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  verified: isValid,
                  paymentId: razorpay_payment_id
                })
              );
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), razorpayApiPlugin()],
  server: {
    port: 5173,
    open: false
  }
});
