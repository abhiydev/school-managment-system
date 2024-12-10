import { config } from "dotenv";

// Load environment variables from .env file
config()

export default env = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port:process.env.MYSQLPORT,
  mysqlport: process.env.MYSQLPORT,
  domain: process.env.DOMAIN
};