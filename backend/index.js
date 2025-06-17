const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Health check for Railway
app.get('/', (req, res) => {
  res.send('🚀 Refinery CRM Backend is live on Railway!');
});

// ✅ Sample login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isValid = bcrypt.compareSync(password, user.password_hash);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful', role: user.role });
});

// ✅ Sample protected route
app.get('/api/kpis', (req, res) => {
  const kpis = db.prepare('SELECT * FROM kpis').all();
  res.json(kpis);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
