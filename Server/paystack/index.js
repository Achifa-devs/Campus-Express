const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');
const transferRoutes = require('./routes/transferRoutes');
const pool = require('./config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

// 🩺 Database health check
app.get('/db/health', async (_req, res) => {
  try {
    const r = await pool.query('SELECT 1 AS ok');
    return res.status(200).json({ ok: true, db: r.rows?.[0]?.ok === 1 });
  } catch (err) {
    console.error('DB health check failed', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// 🔀 Conditional rerouting middleware
app.use((req, res, next) => {
  const { body } = req;

  if (body?.event?.startsWith('transfer.')) {
    console.log('➡️ Rerouting internally to /transfer');
    req.url = '/transfer/confirmation';
  } 
  else if (body?.event?.startsWith('payment.')) {
    console.log('➡️ Rerouting internally to /payment');
    req.url = '/payment';
  }

  next();
});

// 🧩 Route handlers
app.use('/payment', paymentRoutes);
app.use('/transfer', transferRoutes);

// 🚀 Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
