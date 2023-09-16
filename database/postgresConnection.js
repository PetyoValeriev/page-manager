const { Pool } = require('pg');

const pgPool = new Pool({
  user: 'petyo',
  host: 'localhost', // Change to your PostgreSQL host if different
  database: 'jwtTable',
  password: 'tatatayan',
  port: 5432, // Change to your PostgreSQL port if different
});

pgPool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pgPool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err);
});

module.exports = pgPool;
