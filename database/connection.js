const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tatatayanasd1@',
  database: 'page_manager',
  waitForConnections: true,
  connectionLimit: 100, // Adjust this as needed
  queueLimit: 0,
});

module.exports = pool;