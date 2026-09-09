require('dotenv').config();

const bcrypt = require('bcrypt'); // for hashing
const express = require('express'); // for creating the server
const cors = require('cors'); // for handling cross-origin reqs
const { Pool } = require('pg'); // to connect to the pg db

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({status: 'goods', dbTime: result.rows[0].now});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// register new user
app.post('/api/register', async (req, res) => {
  try {
    // get the email and password from the whole app.use(express.json()) middleware
    const { email, password } =  req.body;
  
    // if no email or password entered, return 400 error msg
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required.'});
    }

    // check if user already exists in the db, if so return 409 error msg
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists.'});
    }

    // hash the password before storing using 10 salt round, then insert the new user into the db and return 201 success msg
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword]
    )
    res.status(201).json({
      message: 'User registered successfully.',
      user: newUser.rows[0]
    })

    // if error on our end, catch it and send 500 error msg
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }

}
)