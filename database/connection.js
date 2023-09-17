// Import the necessary modules
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT), // Convert to an integer
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database is connected...');

    // You can perform database operations here using the 'connection' object.

    // Don't forget to release the connection when you're done with it.
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
})();

// Export the 'pool' object
export default pool;
