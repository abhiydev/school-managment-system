import { config } from 'dotenv';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';
import env from '../dotenv.js'

// Mimic `__dirname` in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../../.env') });

// Create a connection without specifying the database
const connection = mysql.createConnection({
  host: env.host,
  user: env.user,
  password: env.password,
  port: env.mysqlport,
});

let db; // Declare `db` at the module level

// Ensure the database and table exist
connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
  if (err) {
    console.error('Failed to create database:', err);
    connection.end();
    return;
  }

  console.log(`Database "${process.env.DB_NAME}" ensured to exist`);

  // Connect to the database after ensuring it exists
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

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
