import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '10kb' }));

const pool = mysql.createPool({
  host: process.env.DB_HOST, user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
  connectionLimit: 5,
});

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/projects', async (_, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY sort_order, id');
    res.json(rows);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Could not load projects.' }); }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, body } = req.body || {};
  if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '') || !body?.trim())
    return res.status(400).json({ error: 'Enter your name, a valid email and a message.' });
  try {
    await pool.query('INSERT INTO messages (name,email,body) VALUES (?,?,?)',
      [name.trim().slice(0, 100), email.trim().slice(0, 150), body.trim().slice(0, 2000)]);
    res.status(201).json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Message not sent. Try again.' }); }
});

app.listen(process.env.PORT || 5000, () => console.log('API running'));
