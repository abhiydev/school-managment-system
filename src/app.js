import { config } from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { addSchool, listSchools, homePage } from './controllers/schoolController.js';

// Mimic `__dirname` in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load dotenv environment variables
config({ path: path.resolve(__dirname, './.env') });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/addSchool', addSchool);
app.get('/listSchools', listSchools);
app.get('/', homePage)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at thttp://localhost:${PORT} && ${process.env.DOMAIN || "DOMAIN NOT YET ASSIGNED"}`);
  console.log('Loaded environment variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
  });
});
