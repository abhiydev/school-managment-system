import { config } from 'dotenv';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';

// Mimic `__dirname` in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../../.env') });

// Check if we're in a production environment (Railway)
const isProduction = process.env.NODE_ENV === 'production';

// Get the database connection URL from the environment (either local or Railway)
const dbUrl = isProduction
  ? process.env.DATABASE_URL // Railway Database URL (set in Railway environment variables)
  : `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

// Create a connection without specifying the database
const connection = mysql.createConnection(dbUrl);

let db; // Declare `db` at the module level

// Ensure the database and table exist
connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQLDATABASE}\``, (err) => {
  if (err) {
    console.error('Failed to create database:', err);
    connection.end();
    return;
  }

  console.log(`Database "${process.env.MYSQLDATABASE}" ensured to exist`);

  // Connect to the database after ensuring it exists
  db = mysql.createConnection(dbUrl);

  // Test the connection
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
      return;
    }

    console.log('Connected to MySQL database');

    // Create the `schools` table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.query(createTableQuery, (err) => {
      if (err) {
        console.error('Failed to create table:', err);
      } else {
        console.log('Table "schools" ensured to exist');
      }
    });
  });

  // Close the initial connection used to create the database
  connection.end();
});

export { db }; // Export the `db` variable
