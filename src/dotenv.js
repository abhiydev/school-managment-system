import { config } from "dotenv";

// Load environment variables from .env file
config()

const env = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.PORT
};

export { env };
// 