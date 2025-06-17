
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.json({ message: "Login successful", role: user.role });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
